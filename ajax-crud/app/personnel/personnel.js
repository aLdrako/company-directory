function readPersonnelTemplate(data, keywords) {

    let readPersonnelHtml = `

        <div class="container">
            <div class="row d-none d-md-block">
                <div class="col-2">Full Name</div>
                <div class="w-100 d-md-none d-block"></div>
                <div class="col-1">Job Title</div>
                <div class="w-100 d-md-none d-block"></div>
                <div class="col-3">Email</div>
                <div class="w-100 d-md-none d-block"></div>
                <div class="col-2">Department</div>
                <div class="w-100 d-md-none d-block"></div>
                <div class="col-1">Location</div>
                <div class="w-100 d-md-none d-block"></div>
                <div class="col-3">Actions</div>
            </div>
        `;

    $.each(data.records, function(key, value) {

        readPersonnelHtml += `
        <div class="row">
            <div class="col-2">${value.firstName} ${value.lastName}</div>
            <div class="col-1">${value.jobTitle}</div>
            <div class="col-3">${value.email}</div>
            <div class="col-2">${value.department}</div>
            <div class="col-1">${value.location}</div>

            <div class="col-3">
                <button class="btn btn-primary btn-sm read-one-personnel-btn" data-id="${value.id}">Read</button>
                <button class="btn btn-info btn-sm update-personnel-btn" data-id="${value.id}">Edit</button>
                <button class="btn btn-danger btn-sm delete-personnel-btn" data-id="${value.id}">Delete</button>
            </div>
        </div>
        `;
    });

    readPersonnelHtml += `</div>`;
 
    // inject to 'page-content' of our app
    $("#page-content").html(readPersonnelHtml);

}
