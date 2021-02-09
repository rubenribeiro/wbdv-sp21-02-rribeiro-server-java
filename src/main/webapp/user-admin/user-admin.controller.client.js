(function() {
    let $tableUsers;
    let $createBtn;
    let $updateBtn;
    let adminUserService = new AdminUserServiceClient();

    let $usernameFld;
    let $passwordFld;
    let $firstNameFld;
    let $lastNameFld;
    let $roleFld;

    let selectedUser = null;

    adminUserService.findAllUsers();

// let users = [
//     {username: "jdoe", firstName: "John", lastName: "Doe", role: "Faculty"},
//     {username: "jane", firstName: "Jane", lastName: "Doe", role: "Faculty"},
// ]

    function clearInputFields() {
        $usernameFld.val("");
        $passwordFld.val("");
        $firstNameFld.val("");
        $lastNameFld.val("");
    }

    function createUser() {
        let newUser = {
            username: $usernameFld.val(),
            password: $passwordFld.val(),
            firstName: $firstNameFld.val(),
            lastName: $lastNameFld.val(),
            role: $roleFld.val()
        }

        adminUserService.createUser(newUser)
            .then( actualUser => {
                users.push(actualUser);
                renderUsers(users);
                clearInputFields();
            });
    }

    function deleteUser(event) {
        let button = $(event.currentTarget);
        console.log(event.currentTarget);

        let index = button.attr('id');
        console.log(`index = ${index}`);
        let id = users[index]._id;
        console.log(`id = ${id}`);
        console.log(users);

        adminUserService.deleteUser(id)
            .then(function(status) {
                users.splice(index, 1);
                renderUsers(users);
            });
    }

    function selectUser(event) {
        let id = $(event.currentTarget).attr('id');
        selectedUser = users.find(user => user._id === id);
        $usernameFld.val(selectedUser.username);
        $passwordFld.val(selectedUser.password);
        $firstNameFld.val(selectedUser.firstName);
        $lastNameFld.val(selectedUser.lastName);
        $roleFld.val(selectedUser.role);
        $updateBtn.prop("disabled", false);
        $createBtn.prop("disabled", true);
    }

    function updateUser(event) {
        selectedUser.username = $usernameFld.val();
        selectedUser.password = $passwordFld.val();
        selectedUser.firstName = $firstNameFld.val();
        selectedUser.lastName = $lastNameFld.val();
        selectedUser.role = $roleFld.val();

        adminUserService.updateUser(selectedUser._id, selectedUser)
            .then( status => {
            let index = users.findIndex( user => user._id === selectedUser._id);
            users[index] = selectedUser;
            renderUsers(users);
            clearInputFields();
            $updateBtn.prop("disabled", true);
            $createBtn.prop("disabled", false);
        });
    }

    function renderUsers(users) {
        $tableUsers.empty();
        for (let i = 0; i < users.length; i++) {
            let user = users[i];
            $tableUsers.prepend(`<tr class="rr-template rr-user rr-hidden">
                                <td class="rr-username">${user.username}</td>
                                <td>&nbsp;</td>
                                <td class="rr-first-name">${user.firstName}</td>
                                <td class="rr-last-name">${user.lastName}</td>
                                <td class="rr-role">${user.role}</td>
                                <td class="rr-actions">
                                    <span class="pull-right" style="white-space: nowrap">
                                         <button id="${i}" type="button" class="btn btn-dark rr-remove"><i class="fa fa-times"></i></button>
                                         <button id="${user._id}" type="button" class="btn btn-dark rr-edit"><i class="fa fa-pencil"></i></button>
                                    </span>
                                </td>
                            </tr>
       `);
        }

        $(".rr-remove").on("click", deleteUser);

        $(".rr-edit").on("click", selectUser);

    }

    function main() {
        $tableUsers = jQuery("#table-users");
        $usernameFld = $("#usernameFld");
        $passwordFld = $("#passwordFld");
        $firstNameFld = $("#firstNameFld");
        $lastNameFld = $("#lastNameFld");
        $roleFld = $("#roleFld");
        $createBtn = $(".rr-create");
        $createBtn.on("click", createUser);
        $updateBtn = $(".rr-update");
        $updateBtn.on("click", updateUser);
        $updateBtn.prop( "disabled", true );

        adminUserService.findAllUsers()
            .then(function (actualUsers) {
                users = actualUsers;
                renderUsers(users);
        });
    }

    $(main)

})();






