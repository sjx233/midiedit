import * as React from "react";
import type { TextEvent, Track } from "../../../../src/midi";
import { newTrack } from "../../../../src/midi";
import List from "./list";
import classes from "./track-list.module.css";

export interface TrackListProps {
  tracks: Track[];
  selectedIndex: number;
  multiTrack: boolean;
  onSelect: (index: number) => void;
  onChange: (tracks: Track[], selectedIndex: number) => void;
}

export default function TrackList({ tracks, selectedIndex, multiTrack, onSelect, onChange }: TrackListProps): JSX.Element {
  return <List
    rowCount={tracks.length}
    rowHeight={50}
    rowRenderer={index => {
      const track = tracks[index];
      const trackName = track.find(event => event.type === "text" && event.subtype === 2) as TextEvent | undefined;
      return <>
        <b className={classes.trackName}>{trackName?.text ?? "(Unnamed)"}</b>
        {`#${index}, ${track.length} ${track.length === 1 ? "event" : "events"}`}
      </>;
    }}
    selectedIndex={selectedIndex}
    canAppend={multiTrack}
    canInsert={multiTrack}
    canRemove={tracks.length > 1}
    onSelect={index => onSelect(index)}
    onAdd={index => onChange(
      [...tracks.slice(0, index), newTrack(), ...tracks.slice(index)],
      index)}
    onRemove={index => onChange(
      [...tracks.slice(0, index), ...tracks.slice(index + 1)],
      selectedIndex >= index && selectedIndex > 0 ? selectedIndex - 1 : selectedIndex)} />;
}
