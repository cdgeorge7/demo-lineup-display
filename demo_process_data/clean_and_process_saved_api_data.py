import json
import os
from pprint import pprint
from time import sleep

from helpers import get_dk_points, get_player_id_player_info_map


# This is a horribly gross data munging file

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


with open(os.path.join(processing_folder_path, game_data_file), "r") as fo:
    data = json.load(fo)
    player_id_player_info_map = get_player_id_player_info_map(
        processing_folder_path)

    minute_records_list = [keep_relevant_records(
        record, player_id_player_info_map) for record in data]

    pprint(minute_records_list[81])

    # # test whether keep_relevant_records is working
    keenan_allen_id = '2540154'
    for minute in minute_records_list:
        if keenan_allen_id in minute:
            # print(minute['counter'])
            print(minute[keenan_allen_id]['dk_points'])
            # sleep(.1)

    # proof that the data is good
    # for i in range(206, 415):
    #     print(get_dk_points(keenan_allen_id, data[i][keenan_allen_id]))
    #     sleep(.5)

    # pprint(data[206][keenan_allen_id])
    # pprint(data[310][keenan_allen_id])

    # pprint(minute_records_list[7])

    # pprint(minute_records_list[414])
    # pprint(minute_records_list[414])
    # for key in data[414]:
    #     if key in ['time', 'counter']:
    #         break
    #     player_tuple = get_dk_points(player_id_player_info_map[key], data[414][key])
    #     print(player_tuple)
