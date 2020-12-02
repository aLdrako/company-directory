function readPersonnelTemplate(data, keywords) {

    let readPersonnelHtml = `
            <!-- MODAL -->
            <div class="modal fade" id="deleteModalConfirmation" tabindex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-sm">
                    <div class="modal-content">
                        <div class="modal-header">
                        <h5 class="modal-title" id="deleteModalLabel">Delete person</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        </div>
                        <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-danger btn-del">Delete</button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- ALERT MESSAGE -->
            <div class="modal fade" id="alertMsg" tabindex="-1" aria-labelledby="alertMsgLabel" aria-hidden="true">
                <div class="modal-dialog modal-sm alert alert-danger text-center">   
                    <strong>No matches!</strong>
                </div>
            </div>
            
            <!-- NAVBAR -->
            <nav id="navbar" class="navbar navbar-expand-md fixed-top navbar-dark">
                <a class="navbar-brand" href="#"><h4 class="h4 page-title"></h4></a>
                <button id="create-personnel" class="btn btn-outline-warning btn-sm create-personnel-btn mr-1" data-toggle="tooltip" title="Add person" data-placement="top"><i class="fas fa-user-plus"></i></button>
                <button class="btn btn-outline-light btn-sm read-department-btn" data-toggle="tooltip" title="Departments" data-placement="top"><i class="fas fa-network-wired"></i></button>
                <button class="btn btn-outline-light btn-sm read-location-btn mx-1" data-toggle="tooltip" title="Locations" data-placement="top"><i class="fas fa-map-marker-alt"></i></button>

                <form class="form-inline mr-auto" id='filter-personnel-form' action='#' method='post'>
                    <select class="form-control form-control-sm" name="filter">
                        ${filterOptionsHtml}
                    </select>
                </form>

                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarCollapse">
                    <form class="form-inline ml-sm-auto mt-1" id='search-personnel-form' action='#' method='post'>
                        <input class="form-control mr-2" type="search" value="${keywords}" name="keywords" placeholder="Search" aria-label="Search">
                        <button class="btn btn-outline-light my-2 my-sm-0" type="submit"><i class="fas fa-search"></i></button>
                    </form>
                </div>
            </nav>

            <!-- TITLE ROW -->
            <div id="header" class="container-fluid fixed-top">
                <div class="row justify-content-center d-md-flex d-none py-3 font-weight-bold header-panel">
                    <div class="col-2">Full Name</div>
                    <div class="col-2">Job Title</div>
                    <div class="col-2">Email</div>
                    <div class="col-2">Department</div>
                    <div class="col-2">Location</div>
                    <div class="col-2">Actions</div>
                </div>
            </div>

            <!-- DATA ROWS -->
            <div class="container-fluid">
        `;

    $.each(data.records, function(key, value) {

        readPersonnelHtml += `
            <div class="row justify-content-center text-center text-md-left py-2 md-mb-1 info-panel">
                <div class="col-6 col-md-2 align-self-center rounded-top data-panel"><i class="fas fa-user d-inline d-md-none"></i> ${value.firstName} ${value.lastName}</div>
                <div class="w-100 d-md-none d-block"></div>
                <div class="col-6 col-md-2 align-self-center data-panel"><i class="fas fa-address-card d-inline d-md-none"></i> ${value.jobTitle}</div>
                <div class="w-100 d-md-none d-block"></div>
                <div class="col-6 col-md-2 align-self-center text-truncate data-panel"><i class="fas fa-envelope d-inline d-md-none"></i> ${value.email}</div>
                <div class="w-100 d-md-none d-block"></div>
                <div class="col-6 col-md-2 align-self-center data-panel"><i class="fas fa-network-wired d-inline d-md-none"></i> ${value.department}</div>
                <div class="w-100 d-md-none d-block"></div>
                <div class="col-6 col-md-2 align-self-center data-panel"><i class="fas fa-map-marker-alt d-inline d-md-none"></i> ${value.location}</div>
                <div class="w-100 d-md-none d-block"></div>
                <div class="col-6 col-md-2 align-self-center text-nowrap rounded-bottom py-1 data-panel">
                    <button class="btn btn-outline-primary btn-sm read-one-personnel-btn" data-id="${value.id}"><i class="far fa-eye"></i></button>
                    <button class="btn btn-outline-info btn-sm update-personnel-btn" data-id="${value.id}"><i class="far fa-edit"></i></button>
                    <button class="btn btn-outline-danger btn-sm delete-personnel-btn" data-id="${value.id}" data-toggle="modal" data-target="#deleteModalConfirmation"><i class="far fa-trash-alt"></i></button>
                </div>
            </div>
        `;
    });

    readPersonnelHtml += `</div>`;
 
    $("#page-content").html(readPersonnelHtml);

}
