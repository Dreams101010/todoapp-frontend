const DateHelper = {
    getLocalDate(date)
    {
        var newDate = new Date(date.getTime() - date.getTimezoneOffset()*60*1000);
        return newDate;   
    },

    getLocalDateNow()
    {
        var date = new Date();
        return this.getLocalDate(date);
    }
};

export default DateHelper;