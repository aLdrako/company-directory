$(document).ready(function() {

    $(document).on('click', '#sortByAsc', function() {
        sortBy(sortAsc);
        sortAsc = sortAsc === 'fnA' ? 'lnA' : 'fnA';
    })

    $(document).on('click', '#sortByDesc', function() {
        sortBy(sortDesc);
        sortDesc = sortDesc === 'fnD' ? 'lnD' : 'fnD';
    })

});

function sortBy(sortToggle) {

    if (sortToggle == 'fnA') {
        personnelDataArray.sort((a, b) => (a.firstName > b.firstName) ? 1 : ((b.firstName > a.firstName) ? -1 : 0)); 
        $('#sortByAsc').html('<i class="fas fa-sort-alpha-up"></i>');
    } else if (sortToggle == 'fnD') {
        personnelDataArray.sort((a, b) => (a.lastName > b.lastName) ? 1 : ((b.lastName > a.lastName) ? -1 : 0));
        $('#sortByDesc').html('<i class="fas fa-sort-alpha-up-alt"></i>');
    } else if (sortToggle == 'lnA') {
        personnelDataArray.sort((a, b) => (a.firstName > b.firstName) ? -1 : ((b.firstName > a.firstName) ? 1 : 0));
        $('#sortByAsc').html('<i class="fas fa-sort-alpha-down"></i>');
    } else if (sortToggle == 'lnD') {
        personnelDataArray.sort((a, b) => (a.lastName > b.lastName) ? -1 : ((b.lastName > a.lastName) ? 1 : 0));
        $('#sortByDesc').html('<i class="fas fa-sort-alpha-down-alt"></i>');
    }

    let readPersonnelHtml = '';

    personnelDataArray.forEach(value => {

        let fullName = '';
        if (sortToggle == 'fnA') {
            fullName = `${value.firstName} ${value.lastName}`;
        } else if (sortToggle == 'fnD') {
            fullName = `${value.lastName} ${value.firstName}`;
        } else if (sortToggle == 'lnA') {
            fullName = `${value.firstName} ${value.lastName}`;
        } else if (sortToggle == 'lnD') {
            fullName = `${value.lastName} ${value.firstName}`;
        }
        
        readPersonnelHtml += `
            <div class="row justify-content-center text-center text-md-left py-1 md-mb-1 info-panel">
                <div class="col-11 col-sm-8 col-md-2 align-self-center rounded-top data-panel"><i class="fas fa-user d-inline d-md-none"></i> ${fullName}</div>
                <div class="w-100 d-md-none d-block"></div>
                <div class="col-11 col-sm-8 col-md-2 align-self-center data-panel"><i class="fas fa-address-card d-inline d-md-none"></i> ${value.jobTitle}</div>
                <div class="w-100 d-md-none d-block"></div>
                <div class="col-11 col-sm-8 col-md-2 align-self-center text-truncate data-panel"><i class="fas fa-envelope d-inline d-md-none"></i> ${value.email}</div>
                <div class="w-100 d-md-none d-block"></div>
                <div class="col-11 col-sm-8 col-md-2 align-self-center data-panel"><i class="fas fa-network-wired d-inline d-md-none"></i> ${value.department}</div>
                <div class="w-100 d-md-none d-block"></div>
                <div class="col-11 col-sm-8 col-md-2 align-self-center data-panel"><i class="fas fa-map-marker-alt d-inline d-md-none"></i> ${value.location}</div>
                <div class="w-100 d-md-none d-block"></div>
                <div class="col-11 col-sm-8 col-md-2 align-self-center text-nowrap rounded-bottom py-2 data-panel">
                    <button class="btn btn-outline-primary btn-sm read-one-personnel-btn" data-id="${value.id}" data-depId="${value.departmentId}"><i class="far fa-eye"></i></button>
                    <button class="btn btn-outline-info btn-sm update-personnel-btn" data-id="${value.id}" data-depId="${value.departmentId}"><i class="far fa-edit"></i></button>
                    <button class="btn btn-outline-danger btn-sm delete-personnel-btn" data-id="${value.id}" data-depId="${value.departmentId}" data-toggle="modal" data-target="#deleteModalConfirmation"><i class="far fa-trash-alt"></i></button>
                </div>
            </div>
        `;
    });

    $('#personnelData').html('');
    $('#personnelData').html(readPersonnelHtml);
}