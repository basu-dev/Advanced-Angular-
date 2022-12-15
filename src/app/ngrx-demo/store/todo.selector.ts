import { createSelector } from "@ngrx/store";
import { AppStoreInterface } from "../appState.interface";

const featureSelector = (state: AppStoreInterface) => state.todos;
export const isLoadingSelector = createSelector(featureSelector, (state) => state.isLoading);
export const todosSelector = createSelector(featureSelector, (state) => state.todos);
export const errorSelector = createSelector(featureSelector, (state) => state.error);

export const addLoadingSelector = createSelector(featureSelector, (state) => state.addLoading);