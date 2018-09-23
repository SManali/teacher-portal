import React from 'react';

class StudentsList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div class="dashboard">
                <div class="dashboard-head">
                    <div class="lead-logo-container text-center container d-inline-block">LEAD Logo</div>
                    <div class="profile-info-container d-inline-block">
                        <span class="notification fas fa-bell"></span>
                        <div class="profile-name-info d-inline-block"><span class="fas fa-user"></span> Person Name</div>
                    </div>
                </div>
                <div class="dashboard-body">
                    <div class="students-control-container d-inline-block">
                        <div class="list-group">
                            <div class="list-group-item">Students</div>
                            <div class="list-group-item list-group-item-action view-students">- View Students</div>
                            <div class="list-group-item list-group-item-action add-student">- Add Student</div>
                        </div>
                    </div>
                    <div class="students-view-container">
                    </div>
                </div>
            </div>
        )
    }
}
module.exports = StudentsList;