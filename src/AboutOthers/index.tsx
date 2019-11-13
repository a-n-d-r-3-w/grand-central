import React from 'react';
import Button from '@material-ui/core/Button';
import shortid from 'shortid';

function AboutOthers() {
    const handleClickCreateAccount = () => {
        const accountId = shortid.generate();

    };

    return (
        <>
            <h1>About Others</h1>
            <Button variant="contained" color="primary" onClick={handleClickCreateAccount}>
                Create account
            </Button>
        </>
    );
}

export default AboutOthers;