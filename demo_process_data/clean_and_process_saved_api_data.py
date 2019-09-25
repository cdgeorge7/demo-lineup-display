from time import time
import json
import os
from pprint import pprint
from time import sleep
import pickle

from helpers import get_dk_points, get_player_id_player_info_map, split_lineup_string


# This is a horribly gross data munging file for horribly gross data

processing_folder_path = os.getcwd()

# nfl_game_data_092219: each item in the list is snapshot of player ids and
# their stat categories for each minute between 11:56 am and 6:59 pm on 9/22/2019
game_data_file = "demo_process_data\\nfl_game_data_092219.json"
player_id_file = "demo_process_data\\relevant_player_ids.csv"
game_data_file = "nfl_game_data_092219.json"
player_id_file = "relevant_player_ids.csv"
minute_stat_records = []

with open(os.path.join(processing_folder_path, player_id_file), "r") as fo:
    relevant_player_ids_list = fo.readline().split(",")


def keep_relevant_records(record, player_id_player_info_map):
    cleaned_object = {}
    for key in record:
        if key not in relevant_player_ids_list and key not in ['counter', 'time']:
            continue
        elif key in ['counter', 'time']:
            cleaned_object[key] = record[key]
        else:
            cleaned_object[key] = player_id_player_info_map[key].copy()
            cleaned_object[key]['dk_points'] = get_dk_points(
                key, record[key])
    return cleaned_object


# clean game data file
with open(os.path.join(processing_folder_path, game_data_file), "r") as fo:
    data = json.load(fo)
    player_id_player_info_map = get_player_id_player_info_map(
        processing_folder_path)

    minute_records_list = [keep_relevant_records(
        record, player_id_player_info_map) for record in data]

    # pprint(minute_records_list[81])

# make object for each minute for each lineup
with open(os.path.join(processing_folder_path, "lineups.txt"), "r") as fo:
    lines = fo.readlines()
    lineup_lists = [split_lineup_string(line) for line in lines]

with open(os.path.join(processing_folder_path, "name_to_player_id.csv"), "r") as fo:
    lines = fo.readlines()
    player_name_to_id_map = {}
    for line in lines:
        player_name_to_id_map[line.split(',')[0]] = line.split(',')[1][:-1]


# pprint(minute_records_list[15])


def set_lineup_data(minute_record):
    response_data = {"counter": minute_record["counter"],
                     "time": minute_record["time"]}
    lineup_objects = []
    for i, lineup in enumerate(lineup_lists):
        lineup_object = {"lineup_id": i+1}
        lineup_points = 0
        player_objects = []
        for player_name in lineup:
            player_id = player_name_to_id_map[player_name]
            player_object = {"player_name": player_name,
                             "position": player_id_player_info_map[player_id]["position"],
                             "team": player_id_player_info_map[player_id]["teamAbbr"]}
            if player_id in minute_record:
                player_object["dk_points"] = minute_record[player_id]["dk_points"]
            else:
                player_object["dk_points"] = 0
            lineup_points += player_object["dk_points"]
            player_objects.append(player_object)
        lineup_object["players"] = player_objects
        lineup_object["lineup_points"] = lineup_points
        lineup_objects.append(lineup_object)
    response_data["lineups"] = lineup_objects
    return response_data


minute_lineups_list = [set_lineup_data(
    minute_record) for minute_record in minute_records_list]

# minute_lineups_list is what should be returned by the server
with open('minute_lineups_list.pkl', 'wb') as fo:
    pickle.dump(minute_lineups_list, fo)
