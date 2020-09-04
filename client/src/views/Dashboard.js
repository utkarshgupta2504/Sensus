/*!

=========================================================
* Black Dashboard React v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// react plugin used to create charts
import { Line, Bar, Doughnut, Pie } from "react-chartjs-2";
// For emojis:
import positiveEmoji from "../assets/emojis/positive1.gif";
import neutralEmoji from "../assets/emojis/neutral1.gif";
import negativeEmoji from "../assets/emojis/negative1.gif";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";

// reactstrap components
import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Label,
  FormGroup,
  Input,
  Table,
  Row,
  Col,
  UncontrolledTooltip,
} from "reactstrap";

// core components
import {
  annualChart,
  entriesDoughnut,
  chartExample3,
  weeklyChart,
} from "variables/charts.js";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      annualChartData: "data1",
      overallMoodData: [33, 33, 33],
      weeklyData: [0, 0, 0, 0, 0, 0, 0],
    };
    this.emojis = [positiveEmoji, neutralEmoji, negativeEmoji];
    this.captions = [
      "You're Doing Great",
      "Hustling Hard",
      "But We Know That You'll Be Doing Better Soon",
    ];
  }

  setBgChartData = (name) => {
    this.setState({
      annualChartData: name,
    });
  };

  componentDidMount() {
    //Fetch total data
    fetch("http://localhost:5000/api/v1/data/total", {
      method: "post",
      headers: {
        "Content-type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
      body: `user=${this.props.auth.user.id}`,
    })
      .then((response) => response.json())
      .then((response) => {
        this.setState({
          overallMoodData: [
            response.N[0].entries.length,
            response.S[0].entries.length,
            response.H[0].entries.length,
          ],
        });
      });

    //Fetch Weekly data
    fetch("http://localhost:5000/api/v1/data/weekly", {
      method: "post",

      headers: {
        "Content-type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
      body: `user=${this.props.auth.user.id}`,
    })
      .then((response) => response.json())
      .then((response) => {
        let date = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
        const dates = {};

        for (let i = 0; i < 7; i++) {
          dates[`${date.getDate()}/${date.getMonth() + 1}`] = i;
          date = new Date(date.getTime() + 24 * 60 * 60 * 1000);
        }

        //Created an enum type dates to get index

        let data = [0, 0, 0, 0, 0, 0, 0];

        //Populating data
        response.forEach((element, index) => {
          data[dates[`${element._id.day}/${element._id.month}`]] = element.val
            ? element.val == "H"
              ? 1
              : element.val == "N"
                ? 0
                : -1
            : 0;
        });

        this.setState({
          weeklyData: data,
        });
      });
  }

  render() {
    return (
      <>
        <div className="content">
          <Row>
            <Col xs="12">
              <Card className="card-chart">
                <CardHeader>
                  <Row>
                    <Col className="text-left" sm="6">
                      <CardTitle tag="h2">Annual Mood Chart</CardTitle>
                    </Col>
                    <Col sm="6">
                      <ButtonGroup
                        className="btn-group-toggle float-right"
                        data-toggle="buttons"
                      >
                        <Button
                          tag="label"
                          className={classNames("btn-simple", {
                            active: this.state.annualChartData === "data1",
                          })}
                          color="info"
                          id="0"
                          size="sm"
                          onClick={() => this.setBgChartData("data1")}
                        >
                          <input
                            defaultChecked
                            className="d-none"
                            name="options"
                            type="radio"
                          />
                          <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                            Positive
                          </span>
                          <span className="d-block d-sm-none">
                            <i className="tim-icons icon-single-02" />
                          </span>
                        </Button>
                        <Button
                          color="info"
                          id="1"
                          size="sm"
                          tag="label"
                          className={classNames("btn-simple", {
                            active: this.state.annualChartData === "data2",
                          })}
                          onClick={() => this.setBgChartData("data2")}
                        >
                          <input
                            className="d-none"
                            name="options"
                            type="radio"
                          />
                          <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                            Neutral
                          </span>
                          <span className="d-block d-sm-none">
                            <i className="tim-icons icon-gift-2" />
                          </span>
                        </Button>
                        <Button
                          color="info"
                          id="2"
                          size="sm"
                          tag="label"
                          className={classNames("btn-simple", {
                            active: this.state.annualChartData === "data3",
                          })}
                          onClick={() => this.setBgChartData("data3")}
                        >
                          <input
                            className="d-none"
                            name="options"
                            type="radio"
                          />
                          <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                            Negative
                          </span>
                          <span className="d-block d-sm-none">
                            <i className="tim-icons icon-tap-02" />
                          </span>
                        </Button>
                      </ButtonGroup>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <div className="chart-area">
                    <Line
                      data={annualChart[this.state.annualChartData]}
                      options={annualChart.options}
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col lg="4">
              <Card className="card-chart">
                <CardHeader>
                  <CardTitle tag="h3">Overall Mood Stats</CardTitle>
                </CardHeader>
                <CardBody>
                  <div className="chart-area">
                    <Doughnut
                      data={(canvas) => {
                        let data = entriesDoughnut.data(canvas);

                        data = {
                          ...data,
                          datasets: data.datasets.map((a) => {
                            return { ...a, data: this.state.overallMoodData };
                          }),
                        };

                        return data;
                      }}
                      options={entriesDoughnut.options}
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col lg="4">
              <Card className="card-chart">
                <CardHeader>
                  <CardTitle tag="h3">Your Mood This Month</CardTitle>
                </CardHeader>
                <CardBody>
                  <div
                    className="chart-area"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignContent: "center",
                      justifyContent: "center",
                    }}
                  >
                    <img
                      alt="your-mood"
                      src={this.emojis[0]}
                      style={{ margin: "auto", alignSelf: "center" }}
                    ></img>
                    <h4 style={{ margin: "auto" }}>{this.captions[0]}</h4>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col lg="4">
              <Card className="card-chart">
                <CardHeader>
                  <CardTitle tag="h3">Weekly Mood Chart</CardTitle>
                </CardHeader>
                <CardBody>
                  <div className="chart-area">
                    <Line
                      data={(canvas) => {
                        let data = weeklyChart.data(canvas);

                        data = {
                          ...data,
                          datasets: data.datasets.map((a) => {
                            return { ...a, data: this.state.weeklyData };
                          }),
                        };

                        return data;
                      }}
                      options={weeklyChart.options}
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps)(withRouter(Dashboard));
