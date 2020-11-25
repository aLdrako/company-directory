function readPersonnelTemplate(data, keywords) {

    let readPersonnelHtml = `
        <!-- MODAL -->
        <div class="modal fade" id="deleteModalConfirmation" tabindex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
            <div class="modal-dialog">
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

        <!-- NAVBAR -->
        <nav id="navbar" class="navbar navbar-expand-md fixed-top navbar-dark">
            <a class="navbar-brand" href="#"><h4 class="page-title"></h4></a>
            <button id="create-personnel" class="btn btn-outline-light btn-sm create-personnel-btn"  data-toggle="tooltip" title="Add person" data-placement="top"><i class="fas fa-user-plus"></i></button>
            <button id="create-department" class="btn btn-outline-light btn-sm ml-1 create-department-btn"  data-toggle="tooltip" title="Departments" data-placement="top"><i class="fas fa-network-wired">+</i></button>
            <button id="create-location" class="btn btn-outline-light btn-sm mr-auto ml-1 create-location-btn"  data-toggle="tooltip" title="Locations" data-placement="top"><i class="fas fa-map-marker-alt">+</i></button>
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
        <div class="container-fluid">
            <div class="row justify-content-center text-center d-md-flex d-none py-3 font-weight-bold personnel-headers">
                <div class="col-2">Full Name</div>
                <div class="col-2">Job Title</div>
                <div class="col-2">Email</div>
                <div class="col-2">Department</div>
                <div class="col-2">Location</div>
                <div class="col-2">Actions</div>
            </div>
        <!-- DATA ROWS -->
        `;

    $.each(data.records, function(key, value) {

        readPersonnelHtml += `
            <div class="row justify-content-center text-center text-md-left py-2 md-mb-1 personnel-info">
                <div class="col-6 col-md-2 align-self-center rounded-top personnel-data"><i class="fas fa-user d-inline d-md-none"></i> ${value.firstName} ${value.lastName}</div>
                <div class="w-100 d-md-none d-block"></div>
                <div class="col-6 col-md-2 align-self-center personnel-data"><i class="fas fa-address-card d-inline d-md-none"></i> ${value.jobTitle}</div>
                <div class="w-100 d-md-none d-block"></div>
                <div class="col-6 col-md-2 align-self-center text-truncate personnel-data"><i class="fas fa-envelope d-inline d-md-none"></i> ${value.email}</div>
                <div class="w-100 d-md-none d-block"></div>
                <div class="col-6 col-md-2 align-self-center personnel-data"><i class="fas fa-network-wired d-inline d-md-none"></i> ${value.department}</div>
                <div class="w-100 d-md-none d-block"></div>
                <div class="col-6 col-md-2 align-self-center personnel-data"><i class="fas fa-map-marker-alt d-inline d-md-none"></i> ${value.location}</div>
                <div class="w-100 d-md-none d-block"></div>
                <div class="col-6 col-md-2 align-self-center text-nowrap rounded-bottom py-1 personnel-data">
                    <button class="btn btn-primary btn-sm read-one-personnel-btn" data-id="${value.id}"><i class="far fa-eye"></i></button>
                    <button class="btn btn-info btn-sm update-personnel-btn" data-id="${value.id}"><i class="far fa-edit"></i></button>
                    <button class="btn btn-danger btn-sm delete-personnel-btn" data-id="${value.id}" data-toggle="modal" data-target="#deleteModalConfirmation"><i class="far fa-trash-alt"></i></button>
                </div>
            </div>
        `;
    });

    readPersonnelHtml += `</div>`;
 
    $("#page-content").html(readPersonnelHtml);

}
