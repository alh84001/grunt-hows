
var SRTParser = {
    parse: function(text) {
        if (!text) return [];

        text = text.replace(/\r\n/g, '\n');
        text = text.replace(/\r/g, '\n');
        var subtitleChunks = text.split(/\n\n+/g).filter(function(chunk) { return chunk.replace(/\s*/g, '').length; });

        var SUBTimestampParser = /^(\d{2})?:?(\d{2}):(\d{2})\.(\d+)\,(\d{2})?:?(\d{2}):(\d{2})\.(\d+)\s*(.*)/;
        var SBVTimestampParser = /^(\d+)?:?(\d{2}):(\d{2})\.(\d+)\,(\d+)?:?(\d{2}):(\d{2})\.(\d+)\s*(.*)/;
        var SRTTimestampParser = /^(\d+)?:?(\d+):(\d+)[\.\,](\d+)\s+\-\-\>\s+(\d+)?:?(\d+):(\d+)[\.\,](\d+)\s*(.*)/;

        return subtitleChunks
          .map(function parseCaptionChunk(chunk, objectCount) {
              var chunkParts = chunk.split(/\n/g);
              // Trim off any blank lines (logically, should only be max. one, but loop to be sure)
              while (!chunkParts[0].replace(/\s+/g, '').length && chunkParts.length > 0) {
                chunkParts.shift();
              }

              // var id = null;
              if (chunkParts[0].match(/^\s*[a-z0-9\-]+\s*$/ig)) {
                // The identifier becomes the cue ID
                // (When *we* load the cues from file. Programatically created cues can have an ID of whatever.)
                // id =
                String(chunkParts.shift().replace(/(\s*)/g, ''));
              } else {
                // We're not parsing a format with an ID prior to each caption like SRT or WebVTT
                // id = objectCount;
              }

              var timeIn, timeOut, cueSettings = '';
              for (var chunkPartIndex = 0; chunkPartIndex < chunkParts.length; chunkPartIndex++) {
                var timestamp = chunkParts[chunkPartIndex];

                var timestampMatch =
                   SRTTimestampParser.exec(timestamp) ||
                   SUBTimestampParser.exec(timestamp) ||
                   SBVTimestampParser.exec(timestamp);
                if (timestampMatch) {
                  var timeData = timestampMatch.slice(1);

                  timeIn = parseInt((timeData[0] || 0) * 60 * 60, 10) +  // hours
                      parseInt((timeData[1] || 0) * 60, 10) +          // minutes
                      parseInt((timeData[2] || 0), 10) +               // seconds
                      parseFloat('0.' + (timeData[3] || 0));          // milis

                  timeOut = parseInt((timeData[4] || 0) * 60 * 60, 10) + // hours
                      parseInt((timeData[5] || 0) * 60, 10) +          // minutes
                      parseInt((timeData[6] || 0), 10) +               // seconds
                      parseFloat('0.' + (timeData[7] || 0));          // milis

                  if (timeData[8]) {
                    cueSettings = timeData[8];
                  }

                  // We've got the timestamp - return all the other unmatched lines as the raw subtitle data
                  chunkParts.splice(chunkPartIndex, 1);
                  break;
                }
              }

              if (!timeIn && !timeOut) {
                // We didn't extract any time information. Assume the cue is invalid!
                return null;
              }

              // The remaining lines are the subtitle payload itself (after removing an ID if present, and the time)
              return new VTTCue(timeIn, timeOut, chunkParts.join('\n'));
            })
          .filter(function(cue) { return !!cue; });
    }
};
