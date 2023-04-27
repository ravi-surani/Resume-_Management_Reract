import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom';

function HeaderComponent({ title, breadcrumbPath }) {
    return (
        <div className="content-header">
            <div className="container-fluid">
                <div className="row mb-2">
                    <div className="col-sm-8">
                        <h1 className="m-0">{title}</h1>
                    </div>
                    <div className="col-sm-4">
                        <ol className="breadcrumb float-sm-right">
                            <li className="breadcrumb-item"><Link to={'/'}>Home</Link></li>
                            {
                                breadcrumbPath?.length && breadcrumbPath.map(path => <Link to={'/' + path.link}>{path.value}</Link>)
                            }
                        </ol>
                    </div>
                </div>
            </div>
        </div >)

}

export default HeaderComponent;
