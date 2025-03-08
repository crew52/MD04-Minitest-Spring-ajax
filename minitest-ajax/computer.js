let currentPage = 0;
let pageSize = 10;
let totalPages = 1;
let searchQuery = "";

function loadComputers() {
    let url = searchQuery
        ? `http://localhost:8080/api/computers/search?search=${searchQuery}&page=${currentPage}&size=${pageSize}`
        : `http://localhost:8080/api/computers?page=${currentPage}&size=${pageSize}`;

    $.ajax({
        url: url,
        method: "GET",
        success: function(response) {
            const computers = response.content;
            totalPages = response.totalPages;
            $("#computerTableBody").empty();

            computers.forEach(computer => {
                $("#computerTableBody").append(`
                            <tr>
                                <td>${computer.id}</td>
                                <td>${computer.code}</td>
                                <td>${computer.name}</td>
                                <td>${computer.producer}</td>
                                <td>${computer.type.name}</td>
                            </tr>
                        `);
            });

            $("#pageInfo").text(`Page ${currentPage + 1} of ${totalPages}`);
            $("#prevPage").prop("disabled", currentPage === 0);
            $("#nextPage").prop("disabled", currentPage >= totalPages - 1);
        },
        error: function() {
            alert("Failed to load data!");
        }
    });
}

$(document).ready(function() {
    loadComputers();

    $("#prevPage").click(function() {
        if (currentPage > 0) {
            currentPage--;
            loadComputers();
        }
    });

    $("#nextPage").click(function() {
        if (currentPage < totalPages - 1) {
            currentPage++;
            loadComputers();
        }
    });

    $("#pageSize").change(function() {
        pageSize = parseInt($(this).val());
        currentPage = 0;
        loadComputers();
    });

    $("#searchButton").click(function() {
        searchQuery = $("#searchInput").val().trim();
        currentPage = 0;
        loadComputers();
    });

    $("#searchInput").keypress(function(event) {
        if (event.which === 13) {
            $("#searchButton").click();
        }
    });
});
// add new
$(document).ready(function () {
    loadTypes();
    $("#addComputer").click(addNewProduct);
});

function loadTypes() {
    $.ajax({
        url: "http://localhost:8080/api/types",
        method: "GET",
        success: function (types) {
            types.forEach(type => {
                $("#typeSelect").append(`<option value="${type.id}">${type.name}</option>`);
            });
        },
        error: function () {
            alert("Failed to load types!");
        }
    });
}

function addNewProduct() {
    let productData = {
        code: $("#code").val(),
        name: $("#name").val(),
        producer: $("#producer").val(),
        type: {
            id: parseInt($("#type").val()) // Ép kiểu thành số
        }
    };

    console.log("Sending data:", JSON.stringify(productData, null, 1)); // In dữ liệu gửi đi

    $.ajax({
        type: "POST",
        url: "http://localhost:8080/api/computers",
        contentType: "application/json",
        data: JSON.stringify(productData),
        success: function () {
            alert("Product added successfully!");
            $("#add-product")[0].reset();
            window.location.href = "computer-list.html"; // Chuyển hướng về danh sách
        },
        error: function (xhr, status, error) {
            console.error("Error:", xhr.responseText); // Log lỗi chi tiết
            alert("Error adding product.");
        }
    });
}

// xử lý type (lấy danh sách)
document.addEventListener("DOMContentLoaded", function () {
    loadProductTypes();
});

function loadProductTypes() {
    fetch("http://localhost:8080/api/types") // Đổi thành API của bạn
        .then(response => response.json())
        .then(data => {
            let typeSelect = document.getElementById("type");
            typeSelect.innerHTML = ""; // Xóa nội dung cũ

            data.forEach(type => {
                let option = document.createElement("option");
                option.value = type.id;
                option.textContent = type.name;
                typeSelect.appendChild(option);
            });
        })
        .catch(error => console.error("Error loading product types:", error));
}

