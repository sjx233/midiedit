import type { ComponentPropsWithoutRef } from "react";
import * as React from "react";

export function AddButton(props: Omit<ComponentPropsWithoutRef<"button">, "className">): JSX.Element {
  return <button className="edit-button" {...props}>＋</button>;
}

export function RemoveButton(props: Omit<ComponentPropsWithoutRef<"button">, "className">): JSX.Element {
  return <button className="edit-button" {...props}>－</button>;
}