import React, { Component } from "react";

import {
  Modal,
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Input,
  CardFooter,
  Button,
} from "reactstrap";
import mongose from "mongoose";
import { editCourseData } from "fetchers/courses";

export default class ModalEditMainInfo extends Component {
  constructor(props) {
    super();
    this.state = {
      course: props.course,
    };
  }

  onHandleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    let newData = {};
    for (let index = 0; index < form.length; index++) {
      if (form[index].name) {
        newData[form[index].name] = form[index].value;
      }
    }

    editCourseData(this.state.course._id, newData, (data) => {
      this.setState({
        course: {
          ...this.props.course,
          ...data,
        },
      });
      this.props.handleCourseDataChanged({
        ...this.props.course,
        ...data,
      });
      this.props.toogleModal();
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
          <Card
            className="m-0 shadow"
            style={{
              border: "1px solid #bbb",
            }}
          >
            <CardHeader className="d-flex" style={{ cursor: "pointer" }}>
              <CardTitle tag="h4">
                <i className="fa fa-pencil mr-2"></i>Editar curso
              </CardTitle>
              <CardTitle
                tag="h4"
                className="mb-0 ml-auto"
                onClick={this.props.toogleModal}
              >
                <i className="fa fa-times"></i>
              </CardTitle>
            </CardHeader>

            <CardBody>
              <p className="m-0 mt-1">titulo del curso:</p>
              <Input
                defaultValue={this.state.course.course_title}
                name="course_title"
                required
              />

              <p className="m-0 mt-1">author id:</p>
              <Input
                id="imput"
                defaultValue={this.state.course.course_author_id}
                name="course_author_id"
                required
              />

              <p className="m-0 mt-1">enlace corto:</p>
              <Input
                defaultValue={this.state.course.course_short_link}
                name="course_short_link"
                required
              />

              <p type="text-area" className="m-0 mt-1">
                descripcion:
              </p>
              <Input
                type="textarea"
                defaultValue={this.state.course.course_description}
                name="course_description"
                required
              />
            </CardBody>
            <CardFooter className="d-flex">
              <Button color="success" className="ml-auto" type="submit">
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
