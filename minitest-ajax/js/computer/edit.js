$(document).ready(function () {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");

    if (!id) {
        alert("Invalid computer ID!");
        return;
    }

    // Load danh sách loại máy tính
    loadTypes().then(() => {
        // Sau khi tải danh sách loại máy, mới tải dữ liệu máy tính
        loadComputerDetails(id);
    }).catch(() => {
        alert("Failed to load computer types!");
    });
});

// Hàm tải danh sách loại máy tính (Dropdown)
function loadTypes() {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: "http://localhost:8080/api/types",
            method: "GET",
            success: function (types) {
                $("#computerType").empty(); // Xóa danh sách cũ
                types.forEach(type => {
                    $("#computerType").append(`<option value="${type.id}">${type.name}</option>`);
                });
                resolve(); // Thành công
            },
            error: function () {
                reject(); // Lỗi
            }
        });
    });
}

// Hàm tải thông tin máy tính
function loadComputerDetails(id) {
    $.ajax({
        url: `http://localhost:8080/api/computers/${id}`,
        method: "GET",
        success: function (computer) {
            $("#computerId").val(computer.id);
            $("#computerCode").val(computer.code);
            $("#computerName").val(computer.name);
            $("#computerProducer").val(computer.producer);
            $("#computerType").val(computer.type.id); // Chọn đúng loại máy
        },
        error: function () {
            alert("Failed to load computer data!");
        }
    });
}

// Hàm cập nhật máy tính
function updateComputer() {
    const id = $("#computerId").val();
    const updatedData = {
        code: $("#computerCode").val(),
        name: $("#computerName").val(),
        producer: $("#computerProducer").val(),
        type: {
            id: $("#computerType").val() // Lấy ID của loại máy
        }
    };

    console.log("Updating Computer with ID:", id);
    console.log("Data being sent:", updatedData);

    $.ajax({
        url: `http://localhost:8080/api/computers/${id}`,
        method: "PUT",
        contentType: "application/json",
        data: JSON.stringify(updatedData),
        success: function (response) {
            console.log("Server Response:", response);
            alert("Computer updated successfully!");
            window.location.href = "computer-list.html";
        },
        error: function (xhr, status, error) {
            console.error("Update failed:", xhr, status, error);
            alert("Failed to update computer!");
        }
    });
}