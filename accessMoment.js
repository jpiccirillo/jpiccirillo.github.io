function getNewestFileInFolder() {
    var arryFileDates, file, fileDate, files, folder, folders,
        newestDate, newestFileID, objFilesByDate;

    folders = DriveApp.getFoldersByName('IFTTT/Gmail Attachments');
    arryFileDates = [];
    objFilesByDate = {};

    while (folders.hasNext()) {
        folder = folders.next();

        files = folder.getFilesByType("application/vnd.google-apps.text");
        fileDate = "";

        while (files.hasNext()) {
            file = files.next();
            Logger.log('xxxx: file data: ' + file.getLastUpdated());
            Logger.log('xxxx: file name: ' + file.getName());
            Logger.log('xxxx: mime type: ' + file.getMimeType())
            Logger.log(" ");

            fileDate = file.getLastUpdated();
            objFilesByDate[fileDate] = file.getId(); //Create an object of file names by file ID

            arryFileDates.push(file.getLastUpdated());
        }
        arryFileDates.sort(function (a, b) {
            return b - a
        });

        Logger.log(arryFileDates);

        newestDate = arryFileDates[0];
        Logger.log('Newest date is: ' + newestDate);

        newestFileID = objFilesByDate[newestDate];

        Logger.log('newestFile: ' + newestFileID);
        //return newestFile;

        var ss = SpreadsheetApp.openById(newestFileID);
        Logger.log('file name that is now open: ' + ss.getName());
        return ss;
    };
};

Console.log(ss);