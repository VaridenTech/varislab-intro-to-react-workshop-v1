import type { ReactNode } from "react";
import emptyPlate from "../assets/empty-plate.svg";

type LoadingProps = {
  label?: string;
};

export function Loading({ label = "Loading…" }: LoadingProps) {
  return (
    <div className="status" role="status">
      <span className="spinner" aria-hidden="true" />
      <p>{label}</p>
    </div>
  );
}

type ErrorMessageProps = {
  message: string;
};

export function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="status status--error" role="alert">
      <p className="status__title">Something went wrong</p>
      <p>{message}</p>
    </div>
  );
}

type EmptyStateProps = {
  title: string;
  children?: ReactNode;
};

export function EmptyState({ title, children }: EmptyStateProps) {
  return (
    <div className="status">
      <img className="status__art" src={emptyPlate} alt="" />
      <p className="status__title">{title}</p>
      {children}
    </div>
  );
}
