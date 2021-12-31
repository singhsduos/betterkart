class ApiFeatures {
    constructor(query, querystr) {
        this.query = query;
        this.querystr = querystr;
    }

    search() {
        const keyword = this.querystr.keyword ? {
            name: {
                $regex: this.querystr.keyword,
                // "i" means case insensitive
                $options: "i",
            },
        } : {};

        this.query = this.query.find({ ...keyword });
        // means we are returning this class only
        return this;
    }

}


module.exports = ApiFeatures;