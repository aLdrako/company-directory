function readPersonnelTemplate(data, keywords) {

    let readPersonnelHtml = `
        <nav id="navbar" class="navbar navbar-expand-md fixed-top navbar-dark">
            <a class="navbar-brand" href="#"><h4 class="page-title"></h4></a>
            <button id="create-personnel" class="btn btn-outline-light btn-sm mr-auto create-personnel-btn">Create</button>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarCollapse">
                <form class="form-inline ml-sm-auto mt-1" id="personnel-search">
                    <input class="form-control mr-2" type="search" value="${keywords}" name="keywords" placeholder="Search" aria-label="Search">
                    <button class="btn btn-outline-light my-2 my-sm-0" type="submit">Search</button>
                </form>
            </div>
        </nav>
        <div class="container-fluid">
            <div class="row justify-content-center text-center d-md-flex d-none py-3 font-weight-bold personnel-headers">
                <div class="col-2">Full Name</div>
                <div class="col-2">Job Title</div>
                <div class="col-2">Email</div>
                <div class="col-2">Department</div>
                <div class="col-2">Location</div>
                <div class="col-2">Actions</div>
            </div>
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
                    <button class="btn btn-danger btn-sm delete-personnel-btn" data-id="${value.id}"><i class="far fa-trash-alt"></i></button>
                </div>
            </div>
        `;
    });

    readPersonnelHtml += `</div>`;
 
    // inject to 'page-content' of our app
    $("#page-content").html(readPersonnelHtml);

}
