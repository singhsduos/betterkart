import React from 'react';
import Helmet from 'react-helmet';

// This file is for page title
const MetaData = ({ title }) => {
    return (
        <Helmet>
            <title>{title}</title>
        </Helmet>
    )
}

export default MetaData;
