import React, { useCallback, useEffect, useState } from "react";
import Checkbox from "@material-ui/core/Checkbox";
import InputLabel from "@material-ui/core/InputLabel";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import { MenuProps, useStyles } from "./utils";
import { getAllTopics } from "../../api/topic";

function TopicSelector({ topicOptions = [], selectedTopicOptionsId = [], setSelectedTopicOptionsId }) {
    const classes = useStyles();

    console.log("TOPICS", topicOptions);
    console.log("SELECTED TOPICS", selectedTopicOptionsId);

    const selectedTopicOptionsIdId = selectedTopicOptionsId.map(topic => topic.topic_id);

    const isAllSelected = useCallback(() => {
        return topicOptions.length > 0 && selectedTopicOptionsId.length === topicOptions.length;
    }, [topicOptions, selectedTopicOptionsId]);

    const handleChange = useCallback((event) => {
        const value = event.target.value;
        if (value[value.length - 1] === "all") {
            setSelectedTopicOptionsId(selectedTopicOptionsId.length === topicOptions.length ? [] : topicOptions.map(topic => topic.topic_id));
            return;
        }
        setSelectedTopicOptionsId(value);
    }, [topicOptions, selectedTopicOptionsId]);

    return (
        <FormControl className={classes.formControl}>
            <InputLabel id="mutiple-select-label">Select topics</InputLabel>
            <Select
                labelId="mutiple-select-label"
                multiple
                value={selectedTopicOptionsId}
                onChange={handleChange}
                renderValue={(selectedTopicOptionsId) => {
                    const selectedTopics = topicOptions.filter(topic => selectedTopicOptionsId.includes(topic.topic_id));
                    return selectedTopics.map(option => option.topic_name).join(", ")
                }}
                MenuProps={MenuProps}
            >
                <MenuItem
                    value="all"
                    classes={{
                        root: isAllSelected() ? classes.selectedTopicOptionsIdAll : ""
                    }}
                >
                    <ListItemIcon>
                        <Checkbox
                            classes={{ indeterminate: classes.indeterminateColor }}
                            checked={isAllSelected()}
                            indeterminate={
                                selectedTopicOptionsId.length > 0 && selectedTopicOptionsId.length < topicOptions.length
                            }
                        />
                    </ListItemIcon>
                    <ListItemText
                        classes={{ primary: classes.selectAllText }}
                        primary="Select All"
                    />
                </MenuItem>
                {topicOptions.map((option) => (
                    <MenuItem key={option.topic_id} value={option.topic_id}>
                        <ListItemIcon>
                            <Checkbox checked={selectedTopicOptionsId.indexOf(option.topic_id) > -1} />
                        </ListItemIcon>
                        <ListItemText primary={option.topic_name} />
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}

export default TopicSelector;
