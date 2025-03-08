$(document).ready(function() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");

    if (id) {
        $.ajax({
            url: `http://localhost:8080/api/computers/${id}`,
            method: "GET",
            success: function(computer) {
                $("#computerId").text(computer.id);
                $("#computerCode").text(computer.code);
                $("#computerName").text(computer.name);
                $("#computerProducer").text(computer.producer);
                $("#computerType").text(computer.type.name);
            },
            error: function() {
                alert("Failed to load computer details!");
            }
        });
    } else {
        alert("Invalid computer ID!");
    }
});