import React from 'react'
import CardHeader from '../Card/CardHeader'
import Card from '../Card/Card'
import CardIcon from '../Card/CardIcon'
import CardFooter from '../Card/CardFooter'
import PeopleIcon from '@material-ui/icons/People';


interface CardDashProps {
    title: string,
    color: string,
    icon: React.ReactElement,
    classes: any,
    value: number
}

const CardDash: React.FC<CardDashProps> = (props) => {

    return (
        <Card>
            <CardHeader color={props.color} stats={true} icon={true}>
                <CardIcon color={props.color}>
                    {props.icon}
                </CardIcon>
                <p className={props.classes.cardCategory}>{props.title}</p>
                <h3 className={props.classes.cardTitle}>{Intl.NumberFormat("pt-BR").format(props.value)}</h3>
            </CardHeader>
            <CardFooter stats={true}>
                <div className={props.classes.stats}>
                    <PeopleIcon />
                  Em todo o Brasil
                </div>
            </CardFooter>
        </Card>
    )
}

export default CardDash