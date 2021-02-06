let $tableUsers;
let $createBtn;

let users = [
    {username: "jdoe", firstName: "John", lastName: "Doe", role: "Faculty"},
    {username: "jane", firstName: "John", lastName: "Doe", role: "Faculty"},
    {username: "roy", firstName: "John", lastName: "Doe", role: "Faculty"},
    {username: "jdoe", firstName: "John", lastName: "Doe", role: "Faculty"},
    {username: "jdoe", firstName: "John", lastName: "Doe", role: "Faculty"},
]
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
                                         <button id="${i}" type="button" class="btn btn-dark rr-remove"><i class="fa fa-times"></i></i></button>
                                         <button type="button" class="btn btn-dark rr-edit"><i class="fa fa-pencil"></i></i></button>
                                    </span>
                                </td>
                            </tr>
       `);
    }

    $(".rr-remove").click(function (event) {
        console.log(event.target);
        let button = $(event.target);
        let id = button.attr('id');
        console.log(id);
        users.splice(id, 1);
        renderUsers(users);
    });
}

function init() {
    console.log("Down is Ready");
    $tableUsers = jQuery("#table-users");
    $createBtn = $(".rr-create");
    $createBtn.click(function() {
        let newUser = {
            username: "userName",
            firstName: "Robert",
            lastName: "Smith",
            role: "Faculty"
        }

        users.push(newUser);
        renderUsers(users);
    });
    renderUsers(users);
}

$(init)