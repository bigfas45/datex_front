


(function ( $ ) { 

  
    $('#default-datatable').DataTable();


    var table = $('#example').DataTable({
        lengthChange: true,
        buttons: [
            'copy',
            'excel',
            'pdf',
            'print',
            'colvis'
        ]
    });

    table.buttons().container().appendTo('#example_wrapper .col-md-6:eq(0)');

}( jQuery ));
