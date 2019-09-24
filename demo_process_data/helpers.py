import requests
from pprint import pprint
import pickle
import os


def get_player_id_name_map(output_file_directory=None):
    if output_file_directory is None:
        output_file_directory = os.getcwd()
    OUTPUT_FILE_NAME = "nfl_fantasy_api_player_id_name_map.pkl"
    output_file_location = os.path.join(
        output_file_directory, OUTPUT_FILE_NAME)

    if os.path.isfile(output_file_location):
        with open(output_file_location, 'rb') as saved_file:
            saved_id_name_map = pickle.load(saved_file)
            return saved_id_name_map
    else:
        API_URL = "https://api.fantasy.nfl.com/v1/players/stats?" +\
            "statType=weekStats&season=2019&week=3&format=json"
        response_json = requests.get(API_URL).json()
        if "players" in response_json:
            id_name_map = {}
            for player in response_json["players"]:
                id_name_map[player["id"]] = player["name"]
            with open(output_file_location, 'wb') as saved_file:
                pickle.dump(id_name_map, saved_file)
                return id_name_map
        else:
            raise ValueError("Key 'players' not in API response JSON.")


def get_player_id_player_info_map(load_from_saved_file=True, output_file_directory=None,
                                  info_keys=["name", "position", "teamAbbr"]):
    if output_file_directory is None:
        output_file_directory = os.getcwd()
    OUTPUT_FILE_NAME = "nfl_fantasy_api_player_id_player_info_map.pkl"
    output_file_location = os.path.join(
        output_file_directory, OUTPUT_FILE_NAME)

    if load_from_saved_file and os.path.isfile(output_file_location):
        with open(output_file_location, 'rb') as saved_file:
            saved_id_name_map = pickle.load(saved_file)
            return saved_id_name_map
    else:
        API_URL = "https://api.fantasy.nfl.com/v1/players/stats?" +\
            "statType=weekStats&season=2019&week=3&format=json"
        response_json = requests.get(API_URL).json()
        if "players" in response_json:
            id_name_map = {}
            for player in response_json["players"]:
                player_object = {}
                for key in info_keys:
                    player_object[key] = player[key]
                id_name_map[player["id"]] = player_object
            with open(output_file_location, 'wb') as saved_file:
                pickle.dump(id_name_map, saved_file)
                return id_name_map
        else:
            raise ValueError("Key 'players' not in API response JSON.")


def get_dk_points(player, player_stats):
    dk_points = 0
    # pass yards
    if '5' in player_stats:
        dk_points += float(player_stats['5']) / 25
        if float(player_stats['5']) >= 300:
            dk_points += 3
    # pass tds
    if '6' in player_stats:
        dk_points += float(player_stats['6']) * 4
    # interceptions
    if '7' in player_stats:
        dk_points -= float(player_stats['7'])
    # rush yards
    if '14' in player_stats:
        dk_points += float(player_stats['14']) / 10
        if float(player_stats['14']) >= 100:
            dk_points += 3
    # rush tds
    if '15' in player_stats:
        dk_points += float(player_stats['15']) * 6
    # receptions
    if '20' in player_stats:
        dk_points += float(player_stats['20'])
    # receiving yds
    if '21' in player_stats:
        dk_points += float(player_stats['21']) / 10
        if float(player_stats['21']) >= 100:
            dk_points += 3
    # receiving tds
    if '22' in player_stats:
        dk_points += float(player_stats['22']) * 6
    # return td
    if '28' in player_stats:
        dk_points += float(player_stats['28']) * 6
    # fumble td
    if '29' in player_stats:
        dk_points += float(player_stats['29']) * 6
    # fumble lost
    if '30' in player_stats:
        dk_points -= float(player_stats['30'])
    # two point conversions
    if '32' in player_stats:
        dk_points += float(player_stats['32']) * 2
    # Defenses
    # sacks
    if '45' in player_stats:
        dk_points += float(player_stats['45'])
    # interceptions
    if '46' in player_stats:
        dk_points += float(player_stats['46']) * 2
    # fumble recoveries
    if '47' in player_stats:
        dk_points += float(player_stats['47']) * 2
    # safeties
    if '49' in player_stats:
        dk_points += float(player_stats['49']) * 2
    # defensive td
    if '50' in player_stats:
        dk_points += float(player_stats['50']) * 6
    # blocked kick
    if '51' in player_stats:
        dk_points += float(player_stats['51']) * 2
    # return td
    if '53' in player_stats:
        dk_points += float(player_stats['53']) * 6
    # points allowed
    if '54' in player_stats:
        points_allowed = float(player_stats['54'])
        if points_allowed == 0:
            dk_points += 10
        elif points_allowed <= 6:
            dk_points += 7
        elif points_allowed <= 13:
            dk_points += 4
        elif points_allowed <= 20:
            dk_points += 1
        elif points_allowed <= 27:
            pass
        elif points_allowed <= 34:
            dk_points -= 1
        else:
            dk_points -= 4
    elif '55' in player_stats:
        dk_points += 10
    elif '56' in player_stats:
        dk_points += 7
    elif '57' in player_stats:
        dk_points += 4
    elif '58' in player_stats:
        dk_points += 1
    elif '59' in player_stats:
        dk_points += 0
    elif '60' in player_stats:
        dk_points -= 1
    elif '61' in player_stats:
        dk_points -= 4
    return dk_points


def main():
    output_file_directory = os.getcwd()
    info_map = get_player_id_player_info_map(output_file_directory, info_keys=[
                                             "name", "position", "teamAbbr"])
    for key in info_map:
        pprint(info_map[key])


if __name__ == "__main__":
    main()
