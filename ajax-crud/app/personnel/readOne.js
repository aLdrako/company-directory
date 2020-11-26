$(document).ready(function(){
 
    $(document).on('click', '.read-one-personnel-btn', function(){

        let id = $(this).attr('data-id');

        $.getJSON("http://localhost/company-directory/api/personnel/readOne.php?id=" + id, function(data){

            let readOnePersonHtml = `
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
                    <button id="read-personnel" class="btn btn-outline-light btn-sm mr-auto read-personnel-btn" data-toggle="tooltip" title="Show all entries" data-placement="top"><i class="fas fa-list"></i></button>
                </nav>

                <div class="container-fluid">
                    <div class="row justify-content-center d-md-flex d-none py-3 font-weight-bold header-panel">
                        <div class="col-2">Full Name</div>
                        <div class="col-2">Job Title</div>
                        <div class="col-2">Email</div>
                        <div class="col-2">Department</div>
                        <div class="col-2">Location</div>
                        <div class="col-2">Actions</div>
                    </div>

                    <div class="row justify-content-center text-center text-md-left py-2 md-mb-1 info-panel">
                        <div class="col-6 col-md-2 align-self-center rounded-top data-panel"><i class="fas fa-user d-inline d-md-none"></i> ${data.firstName} ${data.lastName}</div>
                        <div class="w-100 d-md-none d-block"></div>
                        <div class="col-6 col-md-2 align-self-center data-panel"><i class="fas fa-address-card d-inline d-md-none"></i> ${data.jobTitle}</div>
                        <div class="w-100 d-md-none d-block"></div>
                        <div class="col-6 col-md-2 align-self-center text-truncate data-panel"><i class="fas fa-envelope d-inline d-md-none"></i> ${data.email}</div>
                        <div class="w-100 d-md-none d-block"></div>
                        <div class="col-6 col-md-2 align-self-center data-panel"><i class="fas fa-network-wired d-inline d-md-none"></i> ${data.department}</div>
                        <div class="w-100 d-md-none d-block"></div>
                        <div class="col-6 col-md-2 align-self-center data-panel"><i class="fas fa-map-marker-alt d-inline d-md-none"></i> ${data.location}</div>
                        <div class="w-100 d-md-none d-block"></div>
                        <div class="col-6 col-md-2 align-self-center text-nowrap rounded-bottom py-1 data-panel">
                            <button class="btn btn-info btn-sm update-personnel-btn" data-id="${data.id}"><i class="far fa-edit"></i></button>
                            <button class="btn btn-danger btn-sm delete-personnel-btn" data-id="${data.id}" data-toggle="modal" data-target="#deleteModalConfirmation"><i class="far fa-trash-alt"></i></button>
                        </div>
                    </div>
                </div>
            `;

            $("#page-content").html(readOnePersonHtml);
            
            changePageTitle("Person");
        });
    });
 
});