import React from "react";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
import CheckIcon from '@material-ui/icons/Check';
import BubbleChartIcon from '@material-ui/icons/BubbleChart';
import PeopleIcon from '@material-ui/icons/People';
import FavoriteIcon from '@material-ui/icons/Favorite';
// core components
import GridItem from "../../components/Grid/GridItem";
import GridContainer from "../../components/Grid/GridContainer";
import Table from "../../components/Table/Table";
import Tasks from "../../components/Tasks/Tasks";
import CustomTabs from "../../components/CustomTabs/CustomTabs";
import Danger from "../../components/Typography/Danger";
import Card from "../../components/Card/Card";
import Button from '../../components/CustomButtons/Button';
import CardHeader from "../../components/Card/CardHeader";
import CardIcon from "../../components/Card/CardIcon";
import CardBody from "../../components/Card/CardBody";
import CardFooter from "../../components/Card/CardFooter";

import { bugs, website, server } from "../../variables/general";

import {
  evolutionCasesCharts,
  emailsSubscriptionChart,
  completedTasksChart,
} from "../../variables/charts";

import dashboardStyle from "../../assets/jss/material-dashboard-react/views/dashboardStyle";
import CustomInput from "../../components/CustomInput/CustomInput";
import { InputLabel } from "@material-ui/core";
import Success from "../../components/Typography/Success";
import Axios from "axios";
import CardDash from "../../components/CardDash";

interface Props {
  classes: any;
}

interface State {
  value: number;
  creatingMessage: boolean;
  messageSuccess: boolean;
  messageFailed: boolean;
  casesConfirms: number;
  casesRecovered: number;
  casesDeaths: number;
  cases: number;
  evolutionCasesChart: any;
  casesOfState: any;
}


class Dashboard extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      value: 0,
      creatingMessage: false,
      messageSuccess: true,
      messageFailed: true,
      casesConfirms: 0,
      casesRecovered: 0,
      casesDeaths: 0,
      cases: 0,
      casesOfState: [],
      evolutionCasesChart: null

    };
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeIndex = this.handleChangeIndex.bind(this);
    this.getDataApi = this.getDataApi.bind(this);

  }

  componentDidMount() {
    this.getDataApi()
  }

  handleChange = (event: any, value: number) => {
    this.setState({ value });
  };

  handleChangeIndex = (index: number) => {
    this.setState({ value: index });
  };

  getDataApi = async () => {

    const responseOfBrazil = await Axios({
      url: `https://covid19-brazil-api.now.sh/api/report/v1/brazil`,
    })

    const responseForState = await Axios({
      url: `https://covid19-brazil-api.now.sh/api/report/v1/`,
    })

    const dataCharts = await evolutionCasesCharts()


    this.setState({
      ...this.state,
      cases: responseOfBrazil.data.data.cases,
      casesConfirms: responseOfBrazil.data.data.confirmed,
      casesDeaths: responseOfBrazil.data.data.deaths,
      casesRecovered: responseOfBrazil.data.data.recovered,
      casesOfState: responseForState.data.data,
      evolutionCasesChart: dataCharts
    })

  }

  render() {
    const { classes } = this.props;
    const { creatingMessage, messageFailed, messageSuccess, casesConfirms, casesDeaths, casesRecovered, cases, casesOfState, evolutionCasesChart } = this.state;
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={6} md={3}>
            <CardDash
              title="Casos Confirmados"
              icon={<BubbleChartIcon />}
              value={casesConfirms}
              classes={classes}
              color="warning"
            />
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <CardDash
              title="Casos em Recuperação"
              icon={<PeopleIcon />}
              value={cases}
              classes={classes}
              color="info"
            />
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <CardDash
              title="Casos Recuperados"
              icon={<Accessibility />}
              value={casesRecovered}
              classes={classes}
              color="success"
            />

          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <CardDash
              title="Casos de Óbito"
              icon={<Icon>warning</Icon>}
              value={casesDeaths}
              classes={classes}
              color="danger"
            />

          </GridItem>
        </GridContainer>

        {/* Segundo Container */}

        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card chart={true}>
              <CardHeader color="info">

                <ChartistGraph
                  className="ct-chart"
                  data={evolutionCasesChart ? evolutionCasesChart.data : {
                    labels: [],
                    series: [],
                  }}
                  type="Bar"
                />


              </CardHeader>
              <CardBody>
                <h4 className={classes.cardTitle}>Casos em cada estado</h4>

              </CardBody>
              <CardFooter chart={true}>
                <div className={classes.stats}>
                  <AccessTime /> atualizado hoje
                </div>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={12} md={6}>
            <Card>
              <CardHeader color="info">
                <h4 className={classes.cardTitle}>Número de casos por estado</h4>

              </CardHeader>
              <CardBody>
                <Table
                  tableHeaderColor="primary"
                  tableHead={['Estado', 'Casos', 'Mortes', 'Suspeitos']}
                  tableData={casesOfState.map((state: any) => [`${state.state}`, `${Intl.NumberFormat('pt-BR').format(state.cases)}`, `${Intl.NumberFormat('pt-BR').format(state.deaths)}`, `${Intl.NumberFormat('pt-BR').format(state.suspects)}`])}
                />
              </CardBody>
              <CardFooter chart={true}>
                <div className={classes.stats}>
                  <AccessTime /> atualizado hoje
                </div>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

export default withStyles(dashboardStyle)(Dashboard);
