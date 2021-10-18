import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import "./ViewUser.scss";
import { Link } from "react-router-dom";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import AddUser from "../AddUser/AddUser";
import userServices from "../../../services/userService";
import { CSVLink } from "react-csv";
import { MDBDataTableV5, MDBBtn } from "mdbreact";
import moment from "moment";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

const ViewUser = (props) => {
  const [modalEdit, setModalEdit] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);

  const toggleEdit = () => setModalEdit(!modalEdit);
  const toggleOpen = () => setModalOpen(!modalOpen);
  const toggleDelete = () => setModalDelete(!modalDelete);

  const [familyData, setFamilyData] = useState();
  const [selectedUsers, setSelectedUsers] = useState({ name: "" });
  const [csvData, setCsvData] = useState("");

  const [dataa, setData] = useState({
    columns: [
      {
        label: "#",
        field: "title",
        sort: "asc",
      },
      {
        label: "Last Name",
        field: "lastName",
        sort: "asc",
      },
      {
        label: "First Name",
        field: "firstName",
        sort: "asc",
      },
      {
        label: "Username",
        field: "email",
        // sort: "asc",
      },
      {
        label: "Family Members",
        field: "familyMembers",
        // sort: "asc",
      },
      {
        label: "Consent",
        field: "recieveEmail",
        sort: "asc",
      },
      {
        label: "Action",
        field: "action",
        sort: "asc",
      },
    ],
    rows: [],
  });

  const handleDelete = (id) => {
    userServices
      .deleteUsers(id)
      .then((res) => {
        userServices.handleMessage("delete");
        toggleDelete();
      })
      .catch((err) => {
        userServices.handleError();
        toggleDelete();
      });
  };

  console.log("fam data", familyData);
  useEffect(() => {
    getAdmin();
  }, [modalEdit, modalDelete]);

  const getAdmin = () => {
    userServices
      .getUsers()
      .then((res) => {
        let csvdata = [];
        let data = { ...dataa };
        data.rows = [];
        res.data.map((item, index) => {
          data.rows.push({
            id: item._id,
            title: index + 1,
            email: item.email ? item.email : "none",
            lastName: item.lastName ? item.lastName : "none",
            firstName: item.firstName ? item.firstName : "none",
            recieveEmail: item.recieveEmail ? item.recieveEmail : "none",
            familyMembers: item.familyMembers
              ? item.familyMembers.map((item, index) => {
                  return (
                    <div>
                      {item.familyDetails}
                      <br />
                    </div>
                  );
                })
              : "none",
            action: (
              <div className="row">
                <div>
                  <MdDelete
                    size={25}
                    className="mdi mdi-delete-forever iconsS my-danger-icon"
                    onClick={() => {
                      setSelectedUsers(item);
                      toggleDelete();
                    }}
                  />

                  <FaEdit
                    className="mdi mdi-delete-forever iconsS my-danger-icon"
                    onClick={() => {
                      setSelectedUsers(item);
                      toggleEdit();
                    }}
                  />
                </div>
              </div>
            ),
          });
          if (item.recieveEmail === "Yes") {
            csvdata.push({
              // id: item._id,
              LastName: item.lastName ? item.lastName : "none",
              FirstName: item.firstName ? item.firstName : "none",
              Email: item.email ? item.email : "none",
              FamilyMembers: item.familyMembers
                ? item.familyMembers.map((item, index) => {
                    return item.familyDetails;
                  })
                : "none",
              Consent: item.recieveEmail ? item.recieveEmail : "none",
            });
          }
        });
        console.log("data", data);
        console.log("csvdat", csvdata);
        setData(data);
        setCsvData(csvdata);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div class="container add-user mt-3">
      <div className="card m-b-20">
        <div className="card-body">
          <div class="headings">
            <div className="col-1">
              <button type="button" class="btn btn-success btn-lg">
                <CSVLink data={csvData} filename="Users.csv">
                  Export
                </CSVLink>
              </button>
            </div>
            <div className="col-9">
              <h2>All Users</h2>
            </div>
            <div className="col-2">
              <Button
                type="button"
                class="btn btn-success btn-lg"
                onClick={() => {
                  toggleOpen();
                }}
              >
                Add User
              </Button>
            </div>
          </div>
          <MDBDataTableV5
            responsive
            striped
            // small
            onPageChange={(val) => console.log(val)}
            bordered={true}
            materialSearch
            searchTop
            searchBottom={false}
            // pagingTop
            // barReverse
            hover
            // scrollX
            // autoWidth
            data={dataa}
            theadColor="#000"
          />
        </div>
      </div>
      <Modal isOpen={modalEdit} toggle={toggleEdit}>
        <ModalHeader toggle={toggleEdit}>Edit User</ModalHeader>
        <ModalBody>
          <AddUser editable={true} admin={selectedUsers} toggle={toggleEdit} />
        </ModalBody>
      </Modal>
      <Modal isOpen={modalOpen} toggle={toggleOpen}>
        <ModalHeader toggle={toggleOpen}>Add New User</ModalHeader>
        <ModalBody>
          <AddUser />
        </ModalBody>
      </Modal>
      <Modal isOpen={modalDelete} toggle={toggleDelete}>
        <ModalHeader toggle={toggleDelete}>Delete User?</ModalHeader>
        <ModalBody>
          Are you sure you want to delete the User "{selectedUsers.firstName}"?
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() => {
              handleDelete(selectedUsers._id);
            }}
          >
            Yes
          </Button>{" "}
          <Button color="secondary" onClick={toggleDelete}>
            No
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ViewUser;
