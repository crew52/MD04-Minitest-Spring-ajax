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
                        <td>${computer.type && computer.type.id ? computer.type.name : "Unknown"}</td>
                        <td>
                            <button onclick="viewDetail(${computer.id})">Detail</button>
                            <button onclick="editComputer(${computer.id})">Edit</button>
                            <button onclick="deleteComputer(${computer.id})">Delete</button>
                        </td>
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

// Xử lý xem chi tiết
function viewDetail(id) {
    window.location.href = `computer-detail.html?id=${id}`;
}

// Xử lý chỉnh sửa
function editComputer(id) {
    window.location.href = `edit-computer.html?id=${id}`;
}

// Xử lý xóa
function deleteComputer(id) {
    if (confirm("Are you sure you want to delete this computer?")) {
        $.ajax({
            url: `http://localhost:8080/api/computers/${id}`,
            type: "DELETE",
            success: function () {
                alert("Computer deleted successfully!");
                loadComputers(); // Refresh danh sách sau khi xóa
            },
            error: function () {
                alert("Error deleting computer!");
            }
        });
    }
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
