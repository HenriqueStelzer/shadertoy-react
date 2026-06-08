// @flow

const DEFAULT_KEY_PREFIX = "glsl-helpers-react:persistentTime";

export const parseEpochMs = (epoch: ?(number | string | Date)): ?number => {
  if (epoch == null) return null;
  if (typeof epoch === "number") return epoch;
  if (epoch instanceof Date) return epoch.getTime();
  const parsed = Date.parse(epoch);
  return Number.isFinite(parsed) ? parsed : null;
};

export const resolvePersistentTimeConfig = (
  persistentTime: ?(boolean | Object),
  instanceId: string
) => {
  if (!persistentTime) {
    return { enabled: false, epochMs: null, storageKey: null };
  }

  const options =
    typeof persistentTime === "object" && persistentTime !== null
      ? persistentTime
      : {};

  const storageKey =
    options.storageKey ||
    (options.shared
      ? `${DEFAULT_KEY_PREFIX}:shared`
      : `${DEFAULT_KEY_PREFIX}:${instanceId}`);

  const explicitEpoch = parseEpochMs(options.epoch);

  return {
    enabled: true,
    epochMs: explicitEpoch,
    storageKey,
  };
};

export const initPersistentEpoch = (config: {
  enabled: boolean,
  epochMs: ?number,
  storageKey: ?string,
}) => {
  if (!config.enabled) return null;

  const fallbackEpoch = config.epochMs ?? Date.now();

  if (typeof localStorage === "undefined" || !config.storageKey) {
    return fallbackEpoch;
  }

  try {
    const stored = localStorage.getItem(config.storageKey);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed && typeof parsed.epochMs === "number") {
        return parsed.epochMs;
      }
    }
    const epochMs = config.epochMs ?? Date.now();
    localStorage.setItem(
      config.storageKey,
      JSON.stringify({ epochMs })
    );
    return epochMs;
  } catch {
    return fallbackEpoch;
  }
};

export const getPersistentTimeSeconds = (epochMs: ?number): number => {
  if (epochMs == null) return 0;
  return (Date.now() - epochMs) / 1000;
};

export const persistentTimeEqual = (
  a: ?(boolean | Object),
  b: ?(boolean | Object)
) => JSON.stringify(a ?? false) === JSON.stringify(b ?? false);
