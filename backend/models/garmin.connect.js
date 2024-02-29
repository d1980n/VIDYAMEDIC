const mongoose  = require("mongoose");

const GarminSchema = new mongoose.Schema({
    userProfilePK: Number,
    calendarDate: Date,
    startTimestampGMT: Date,
    endTimestampGMT: Date,
    startTimestampLocal: Date,
    endTimestampLocal: Date,
    maxHeartRate: Number,
    minHeartRate: Number,
    restingHeartRate: Number,
    lastSevenDaysAvgRestingHeartRate: Number,
    heartRateValueDescriptors: [{
        key: String,
        index: Number
    }],
    heartRateValues: [[Number]]
});
    const GarminConnect = mongoose.model("garmin", GarminSchema);

module.exports = GarminConnect;