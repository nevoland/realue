/* eslint-disable */
// @ts-nocheck

import { type PromiseStatus, reduceStatusList } from "futurise";
import {
  type Filter,
  type KeyFiltered,
  type QueryReadMultiple,
  testFilter,
} from "quetch";
import { usePrevious, useResilient } from "realue";

import { useCallback, useMemo, useState } from "../dependencies.js";
import { filterFromExpansion } from "../tools/filterFromExpansion.js";
import { isDefined } from "../tools/isDefined.js";
import { clamp } from "../tools.js";
import type { CustomFetch, Expansion, ValueChanges } from "../types";

import { useEventListener } from "./useEventListener.js";
import { useQuery } from "./useQuery.js";

type UseDataListOptions<T extends object> = Omit<
  QueryReadMultiple<T>,
  "method" | "multiple"
> & {
  type: T[] | string;
  changes?: ValueChanges<T>;
  overscan?: number;
  // Expansion settings
  expansion?: Expansion;
  fieldKeyId?: KeyFiltered<T, string>;
  separator?: string;
  parentId?: string;
  matchStart?: boolean;
};

export function useDataList<T extends object>(
  customFetch: CustomFetch<T>,
  {
    type,
    offset: rawOffset = 0,
    limit: rawLimit = 20,
    overscan = clamp((rawLimit / 2) | 0, 3, 20),
    order,
    context,
    filter: currentFilter,
    fields,
    // changes,
    expansion,
    fieldKeyId,
    separator,
    parentId = separator,
    matchStart,
  }: UseDataListOptions<T>,
): {
  value: (T | undefined)[] | undefined;
  offset: number;
  overscan: number;
  filter: Filter<T>;
  count: number | undefined;
  status: PromiseStatus;
} {
  const filter = useMemo(
    () =>
      expansion === undefined
        ? currentFilter
        : ({
            operator: "all",
            value: [
              filterFromExpansion<T>(
                expansion,
                fieldKeyId,
                separator,
                parentId,
                matchStart,
              ),
              currentFilter,
            ].filter(isDefined),
          } as Filter<T>),
    [expansion, currentFilter, fieldKeyId, separator],
  );

  const [refresh, onChangeRefresh] = useState(false);

  useEventListener(
    Array.isArray(type) ? undefined : `data.${type}`,
    useCallback(() => {
      onChangeRefresh((refresh) => !refresh);
    }, []),
  );

  const initialOffset = clamp(rawOffset - overscan, 0);
  const offset = useResilient(
    initialOffset,
    useCallback(
      (nextValue: number, currentValue: number) =>
        nextValue === 0 || Math.abs(nextValue - currentValue) >= overscan,
      [overscan],
    ),
  );

  const limit = rawLimit + overscan * 2;
  const previousLimit = usePrevious(limit) ?? 0;
  const currentLimit = useResilient(limit, () => limit > previousLimit);

  const query: QueryReadMultiple<T> = useMemo(
    () =>
      ({
        type,
        context,
        method: "read",
        multiple: true,
        offset,
        limit,
        filter,
        order,
        fields: fields?.filter((field) => typeof field !== "symbol"),
      }) as const,
    [type, context, offset, currentLimit, filter, order, fields, refresh],
  );

  const request = useQuery(customFetch, query);

  const requestStatus = request.status;

  const value = useResilient(request.value);
  const currentOffset = useResilient(
    offset,
    () => requestStatus === "fulfilled",
  );

  const previousFilter = usePrevious(filter);

  const valueFiltered = useMemo((): T[] | undefined => {
    if (
      requestStatus === "pending" &&
      value !== undefined &&
      previousFilter !== filter
    ) {
      return value.filter((item) => testFilter(filter, item));
    }
    return value;
  }, [value, filter, requestStatus]);

  const valueSliced = useMemo((): T[] | undefined => {
    if (requestStatus === "pending" && valueFiltered !== undefined) {
      if (offset < currentOffset) {
        return [
          ...Array(Math.min(currentOffset - offset, limit)).fill(undefined),
          ...valueFiltered.slice(0, offset - currentOffset),
        ];
      }
      if (offset > currentOffset) {
        return [
          ...valueFiltered.slice(offset - currentOffset),
          ...Array(Math.min(offset - currentOffset, limit)).fill(undefined),
        ];
      }
    }
    return valueFiltered;
  }, [valueFiltered, offset, requestStatus]);

  const requestCount = useQuery(
    customFetch,
    useMemo(
      () => ({
        type,
        method: "aggregate",
        aggregator: "length",
        filter,
      }),
      [type, filter],
    ),
  );

  const count = useResilient(requestCount.value);

  return {
    value: valueSliced as T[] | undefined,
    offset,
    overscan,
    count,
    filter: filter as Filter<T>,
    status: reduceStatusList(request.status, requestCount.status),
  };
}

function GroupData_NEW(props: ViewComponentProps) {
  const companyId = useGlobal()?.companyUid;
  const groupId = props.value;

  const nevoPropsAndStatusNEW = useAsyncProps(
    useSyncedProps(),
    {
      value: () =>
        customFetch({
          type: "group",
          method: "read",
          context: {
            companyId,
            groupId,
          },
        }),
      onChange: (value, name) =>
        customFetch({
          type: "group",
          method: value?.id ? "update" : "create",
          context: {
            id: value?.id,
            company,
          },
          value: {
            company,
            definition: formatFilter(value.filter),
            name: value?.name,
            parentDeviceGroup:
              value?.parentDeviceGroup === ""
                ? undefined
                : value?.parentDeviceGroup,
            parentsPath: value?.parentsPath,
          },
        }),
    },
    [customFetch, company, groupId],
  );

  <DeviceInfo>
    <DeviceStats name="stats" onChangeStatus={onChangeStatus} />
    <DeviceAlerts name="alerts" onChangeStatus={onChangeStatus} />
  </DeviceInfo>;

  useAsyncProps(
    useAsyncProps(
      useAsyncProps(
        {},
        {
          value: () => ({
            type: "user",
            context: {
              userId,
            },
          }),
        },
        [userId],
      ),
      {
        value: (value) => ({
          type: "profile",
          multiple: true,
          filter: {
            field: "user",
            operator: "equal",
            value: value?.id,
          },
        }),
      },
    ),
    {
      value: (value) => ({
        type: "right",
        multiple: true,
        filter: {},
      }),
    },
  );

  const userProps = useAsyncProps(
    {},
    {
      value: () => ({
        type: "user",
        context: {
          userId,
        },
      }),
    },
    [userId],
  );

  const profileListProps = useAsyncProps(
    {},
    {
      value: (value) =>
        userProps.value?.id === undefined
          ? undefined
          : {
              type: "profile",
              multiple: true,
              filter: {
                field: "user",
                operator: "equal",
                value: userProps.value?.id,
              },
            },
    },
    [userProps.value?.id],
  );

  const userProps = useAsyncProps(
    {},
    {
      value: () => ({
        type: "right",
        multiple: true,
        filter: {
          field: "profile",
          operator: "include",
          value: {
            type: "profile",
            filter: {
              field: "user",
              operator: "equal",
              value: {
                type: "",
              },
            },
          },
        },
      }),
    },
    [userId],
  );

  const {
    name,
    error,
    value = DEFAULT_VALUE,
    onChange,
    onChangeError,
    status = "pending",
  } = useAsyncProps(
    // Parent props NEVOOOS
    {
      name,
      error,
      // Optional initial value
      value,
      onChange,
      onChangeError,
      onChangeStatus,
      status, // ?
    },
    // Options
    {
      value: () =>
        groupId === undefined
          ? undefined
          : {
              type: "group",
              method: "read",
              context: {
                companyId,
                groupId,
              },
            },
      onChange: (value, name) => ({
        type: "group",
        method: value?.id !== undefined ? "update" : "create",
        context: {
          groupId: value?.id,
          company,
        },
        value: {
          company,
          definition: formatFilter(value.filter),
          name: value?.name,
          parentDeviceGroup:
            value?.parentDeviceGroup === ""
              ? undefined
              : value?.parentDeviceGroup,
          parentsPath: value?.parentsPath,
        },
      }),
      onRemove: (name) => ({
        type: "group",
        method: "delete",
        context: {
          companyId,
          groupId,
        },
      }),
      fetch: customFetch,
      subscribe: customSubscribe,
    },
    [companyId, groupId],
  );

  const nevoPropsAndStatusNEW2 = useAsyncProps(
    {
      value: {
        companyId,
        groupId,
      },
    },
    {
      value: () => ({
        type: "group",
        context: {
          companyId,
          groupId,
        },
      }),
      onChange: (value, name) => ({
        type: "group",
        method: value?.id !== undefined ? "update" : "create",
        context: {
          id: value?.id,
          company,
        },
        value: {
          company,
          definition: formatFilter(value.filter),
          name: value?.name,
          parentDeviceGroup:
            value?.parentDeviceGroup === ""
              ? undefined
              : value?.parentDeviceGroup,
          parentsPath: value?.parentsPath,
        },
      }),
      fetch: customFetch,
      subscribe: customSubscribe,
    },
    [company, groupId],
  );

  const nevoPropsAndStatusNEW = useAsyncProps(
    useSyncedProps(),
    () => {
      if (id === undefined) {
        return undefined;
      }
      return {
        type: "group",
        method: "read",
        context: {
          companyId,
          id,
        },
      };
    },
    [company, id],
  );

  const nevoPropsAndStatus = useValue(
    useSyncedProps(),
    () => {
      if (id === undefined) {
        return undefined;
      }
      return {
        type: "group",
        method: "read",
        context: {
          companyId,
          id,
        },
      };
    },
    [company, id],
  );

  // nevoPropsAndStatus.initial === true

  nevoPropsAndStatus.value;
  nevoPropsAndStatus.error;

  nevoPropsAndStatus.error ===
    {
      "": ["The group does not exist"],
    };

  // useRequestObserver(
  //   (query) =>
  //     query.type === "group" &&
  //     query.method === "delete" &&
  //     !query.external &&
  //     targets(query, nevoPropsAndStatus2.value),
  //   () => props.onRemove?.()
  // );

  const nevoPropsAndStatus2 = useRequest(
    nevoPropsAndStatus,
    (value, name) => ({
      type: "group",
      method: value?.id ? "update" : "create",
      context: {
        id: value?.id,
        company,
      },
      value: {
        company,
        definition: formatFilter(value.filter),
        name: value?.name,
        parentDeviceGroup:
          value?.parentDeviceGroup === ""
            ? undefined
            : value?.parentDeviceGroup,
        parentsPath: value?.parentsPath,
      },
    }),
    [company],
  );

  useEffect(() => {
    if (nevoPropsAndStatus2.status === "fulfilled") {
      props.onRemove?.();
    }
  }, [nevoPropsAndStatus2]);

  return (
    <Group
      {...nevoPropsAndStatus2}
      company={company}
      fieldKeyList={fieldKeyList}
      initialValue={nevoProps.value}
      onChangeFieldKeyList={onChangeFieldKeyList}
      parentDeviceGroupId={parentDeviceGroupId}
    />
  );
}
