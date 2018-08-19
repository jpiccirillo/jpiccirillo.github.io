#!/usr/bin/env python3

#Initial set up script, select two dates and pulls data manually for that range
#use other script to pull data automatically from last date in file that this script
# generates --> current date -1.  Appends new data into file this one creates and
# changes the filename as well

import pandas as pd
import time
import datetime
import os
import urllib.request

def request():
    os.system('clear')
    key = "B63YKcVWCSFH0NStuEC_TLKLNmGq5SjA9JHW3X9N"
    perspective = "interval"
    begindate = "2018-08-10"
    enddate = "2018-08-11"
    format = "csv"

    intervals = ["hour", "day"]
    kindsofdata = ["overview", "activity"]

    for interval in intervals:
        for kind in kindsofdata:
            url = (
                "https://www.rescuetime.com/anapi/data"
                + "?key=" + key
                + "&perspective=" + perspective
                + "&restrict_kind=" + kind
                + "&resolution_time=" + interval
                + "&restrict_begin=" + begindate
                + "&restrict_end=" + enddate
                + "&format=" + format)

            print(kind, interval, begindate, enddate)
            # Download the file from `url` and save it locally under `file_name`:
            filename = "rt_" + begindate + "|" + enddate + "|" + kind + "|" + interval + "." + format
            urllib.request.urlretrieve(url, kind + "_" + interval + "/" + filename)

request()
