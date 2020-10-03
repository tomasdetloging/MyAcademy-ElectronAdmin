import React, { Component } from "react";
import {
  Modal,
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  CardFooter,
  Button,
  Input,
} from "reactstrap";
import Axios from "axios";
import { addCourseUrl } from "config";
import mongose from "mongoose";
import Alerts from "helpers/Alerts";

export default class ModalAddCourse extends Component {
  //
  constructor(props) {
    super();
    this.state = {
      course: props.course,
    };
  }

  onHandleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    let data = {};
    for (let index = 0; index < form.length; index++) {
      if (form[index].name) {
        data[form[index].name] = form[index].value;
      }
    }

    Alerts.showLoading();
    Axios.post(addCourseUrl, data)
      .then((response) => {
        this.props.handleCourseDataChanged({
          ...{ _id: this.state.course._id },
          ...response.data,
        });
        this.props.toogleModal();
      })
      .catch((error) => {
        Alerts.showErrorUnknow();
        console.error(error);
      });
  };

  componentDidUpdate() {
    setTimeout(() => {
      //validation input AuthorId
      let inputId = document.getElementById("imput");
      if (inputId)
        inputId.addEventListener("input", (e) => {
          if (!mongose.Types.ObjectId.isValid(inputId.value)) {
            inputId.setCustomValidity("!invalid");
          } else {
            inputId.setCustomValidity("");
          }
        });
    }, 1000);
  }

  render() {
    return (
      <Modal isOpen={this.props.isOpen} className="modal-centered modal-lg p-0">
        <form onSubmit={this.onHandleSubmit}>
          <Card>
            <CardHeader className="d-flex" style={{ cursor: "pointer" }}>
              <CardTitle tag="h5" className="mb-0">
                <i className="fa fa-plus mr-2" />
                Anadir curso
              </CardTitle>
              <CardTitle
                tag="h5"
                className="mb-0 ml-auto"
                onClick={this.props.toogleModal}
              >
                <i className="fa fa-times"></i>
              </CardTitle>
            </CardHeader>

            <CardBody>
              <p className="m-0 mt-1">titulo del curso:</p>
              <Input name="course_title" required />

              <p className="m-0 mt-1">author id:</p>
              <Input id="imput" name="course_author_id" required />

              <p className="m-0 mt-1">enlace corto:</p>
              <Input name="course_short_link" required />

              <p type="text-area" className="m-0 mt-1">
                descripcion:
              </p>
              <Input type="textarea" name="course_description" required />
            </CardBody>
            <CardFooter>
              <Button type="submit">
                <i className="fa fa-save mr-2" />
                Guardar
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Modal>
    );
  }
}