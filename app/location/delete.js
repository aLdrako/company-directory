$(document).ready(function(){
 
    $(document).on('click', '.delete-location-btn', function(){

        let id = $(this).attr('data-id');
        let locName = $(this).attr('data-name');
        $('#deleteModalConfirmation .modal-body').addClass('d-none');

        $('#deleteModalConfirmation').on('click', '.btn-del', function() {

            if (departmentsArray.findIndex(el => el.locationId === id) === -1) {

                locations.splice(locations.indexOf(locName), 1);

                $.ajax({
                    url: "http://localhost/company-directory/api/location/delete.php",
                    type : "POST",
                    dataType : 'json',
                    data : JSON.stringify({ id: id }),
                    success : function(result) {

                        showLocation();
                        $('#deleteModalConfirmation').modal('hide');
                        $('body').removeClass('modal-open');
                        $('.modal-backdrop').remove();
                        $('body').css('padding-right', 0);
                        
                    },
                    error: function(xhr, resp, text) {
                        console.log(xhr, resp, text);
                    }
                });
            } else {
                $('#deleteModalConfirmation .modal-body').removeClass('d-none');
            }

        });
    });
});