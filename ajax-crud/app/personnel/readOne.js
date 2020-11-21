$(document).ready(function(){
 
    $(document).on('click', '.read-one-personnel-btn', function(){

        let id = $(this).attr('data-id');

        $.getJSON("http://localhost/company-directory/api/personnel/readOne.php?id=" + id, function(data){

            var readOnePersonHtml = `
                <nav id="navbar" class="navbar navbar-expand-md fixed-top navbar-dark">
                    <a class="navbar-brand" href="#"><h4 class="page-title"></h4></a>
                    <button id="read-personnel" class="btn btn-outline-light btn-sm mr-auto read-personnel-btn">Show</button>
                </nav>

                <div class="container-fluid">
                    <div class="row justify-content-center d-md-flex d-none py-3 font-weight-bold personnel-headers">
                        <div class="col-2">Full Name</div>
                        <div class="col-2">Job Title</div>
                        <div class="col-2">Email</div>
                        <div class="col-2">Department</div>
                        <div class="col-2">Location</div>
                        <div class="col-2">Actions</div>
                    </div>

                    <div class="row justify-content-center text-center text-md-left py-2 md-mb-1 personnel-info">
                        <div class="col-6 col-md-2 align-self-center rounded-top personnel-data"><i class="fas fa-user d-inline d-md-none"></i> ${data.firstName} ${data.lastName}</div>
                        <div class="w-100 d-md-none d-block"></div>
                        <div class="col-6 col-md-2 align-self-center personnel-data"><i class="fas fa-address-card d-inline d-md-none"></i> ${data.jobTitle}</div>
                        <div class="w-100 d-md-none d-block"></div>
                        <div class="col-6 col-md-2 align-self-center text-truncate personnel-data"><i class="fas fa-envelope d-inline d-md-none"></i> ${data.email}</div>
                        <div class="w-100 d-md-none d-block"></div>
                        <div class="col-6 col-md-2 align-self-center personnel-data"><i class="fas fa-network-wired d-inline d-md-none"></i> ${data.department}</div>
                        <div class="w-100 d-md-none d-block"></div>
                        <div class="col-6 col-md-2 align-self-center personnel-data"><i class="fas fa-map-marker-alt d-inline d-md-none"></i> ${data.location}</div>
                        <div class="w-100 d-md-none d-block"></div>
                        <div class="col-6 col-md-2 align-self-center text-nowrap rounded-bottom py-1 personnel-data">
                            <button class="btn btn-info btn-sm update-personnel-btn" data-id="${data.id}"><i class="far fa-edit"></i></button>
                            <button class="btn btn-danger btn-sm delete-personnel-btn" data-id="${data.id}"><i class="far fa-trash-alt"></i></button>
                        </div>
                    </div>
                </div>
            `;

            $("#page-content").html(readOnePersonHtml);
            
            changePageTitle("Show Person");
        });
    });
 
});