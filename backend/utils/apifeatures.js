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

        // this.query means you can suppose that it is written Product.find() method
        this.query = this.query.find({ ...keyword });
        // means we are returning this class only
        return this;
    }

    filter() {
        // Method here we used is Shallow Copy to copying object
        const queryCopy = { ...this.querystr };

        // removing some fields so that these keyword don't run own function for category
        const removeFields = ["keyword", "page", "limit"];

        removeFields.forEach((key) => delete queryCopy[key]);


        // first make object to string
        let querystr = JSON.stringify(queryCopy);

        // gt => greater than, gte => greater than equal to, lt => less than, lte => less than equal to,
        querystr = querystr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

        // again make string to object
        this.query = this.query.find(JSON.parse(querystr));
        return this;
        
    }

    pagination(resultPerPage) {
        const currentPage = Number(this.querystr.page) || 1;
        
        //  Basic Math if total product is 50 
        // and you are showing 10 product each page then result will be suppose for 3rd page 10*(3-1) = 20
        // means you will skip 20 product of two pages
        const skip = resultPerPage * (currentPage - 1);

        this.query = this.query.limit(resultPerPage).skip(skip);

        return this;
    }

}


module.exports = ApiFeatures;