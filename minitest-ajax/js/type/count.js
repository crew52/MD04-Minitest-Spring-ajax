function loadTypes() {
    $.ajax({
        url: "http://localhost:8080/api/types/count",
        method: "GET",
        success: function(response) {
            $("#typesTableBody").empty();

            response.forEach(type => {
                $("#typesTableBody").append(`
                            <tr>
                                <td>${type.id}</td>
                                <td>${type.name}</td>
                                <td>${type.count}</td>
                            </tr>
                        `);
            });
        },
        error: function() {
            alert("Failed to load data!");
        }
    });
}

$(document).ready(function() {
    loadTypes();
});