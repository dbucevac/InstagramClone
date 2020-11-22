import React from 'react';

//functional component which informs the user that requested page isn't found

const NotFound = () => {
    return(
        <div class="valign-wrapper" style={{"width":"100%", "height":"50%", "position": "absolute"}}>
            <div className="valign" style={{"width":"100%"}}>
                <div className="container error">
                    <div className="row">
                        <div className="col s12">
                            <h1 className="errorTxt center pink-text text-lighten-3">404</h1>
                        </div> 
                    </div>
                    <div className="row">
                        <div className="col s12">
                            <h1 className="errorTxt center pink-text text-lighten-3">Page Not Found</h1>
                        </div> 
                    </div>
                    <div className="row">
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NotFound;