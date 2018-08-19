#!/usr/bin/env python3
import time
import glob
import datetime as dt
import os
import csv
import urllib.request

def request():
    os.system('clear')
    key = "B63YKcVWCSFH0NStuEC_TLKLNmGq5SjA9JHW3X9N"
    perspective = "interval"
    format = "csv"

    intervals = ["hour", "day"]
    kindsofdata = ["overview", "activity"]

    for interval in intervals:
        for kind in kindsofdata:
            folder = kind + "_" + interval + "/"

            #most recent date on record (begin date)
            mostRecent = lastDate(folder) + dt.timedelta(days=1)

            #yesterday at midnight (end date) (ignore anything today so that script can be run @anytime)
            midnight = dt.datetime.combine(dt.datetime.today(), dt.time.min)
            yday_midnight = (midnight - dt.timedelta(days=1)).strftime("%Y-%m-%d")

            url = (
                "https://www.rescuetime.com/anapi/data"
                + "?key=" + key
                + "&perspective=" + perspective
                + "&restrict_kind=" + kind
                + "&resolution_time=" + interval
                + "&restrict_begin=" + mostRecent.strftime("%Y-%m-%d")
                + "&restrict_end=" + yday_midnight
                + "&format=" + format)

            # filename = "rt_" + begindate + "|" + enddate + "|" + kind + "|" + interval + "." + format
            webpage = urllib.request.urlopen(url)
            datareader = csv.reader(webpage.read().decode('utf-8').splitlines())

            with open(latestFile(folder), 'a', encoding='utf-8', newline='') as outFile:
                writer = csv.writer(outFile)
                writer.writerows(datareader)

            latest = latestFile(folder)
            print("latest: " + str(latest))
            oldParts = latest.split("|")
            print(oldParts)
            newName = oldParts[0] + "|" + yday_midnight + "|" + oldParts[2] + "|" + oldParts[3]
            os.rename(latest, newName)

def latestFile(dir):
    list_of_files = glob.glob(dir + "*.csv")
    return max(list_of_files, key=os.path.getctime)

def lastDate(dir):
    latest_file = latestFile(dir)

    with open(latest_file) as fh:
        reader = csv.reader(fh, delimiter = ',')
        for line in reader:
            pass

        last = line
        # print(last)
        date_obj = dt.datetime.strptime(last[0], "%Y-%m-%dT%H:%M:%S")

    return date_obj

request()
