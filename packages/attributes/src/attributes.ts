import { ATTRIBUTES, type MuiAttributeKey, type MuiAttributesCallback } from '@minimalsquare/attributes-utils';

import { loadAttribute } from './load';

// Define the MuiAttributes interface
interface MuiAttributes {
  scripts: HTMLScriptElement[];
  solutions: Record<
    MuiAttributeKey,
    {
      loading?: Promise<unknown>;
      resolve?: (value: unknown) => void;
      version?: string;
      destroy?: () => boolean;
      restart?: () => Promise<unknown>;
    }
  >;
  process: Set<MuiAttributeKey>;
  load: (attribute: MuiAttributeKey) => Promise<unknown>;
  push: (...args: MuiAttributesCallback[]) => void;
  destroy: () => void;
}

// Extend the Window interface
declare global {
  interface Window {
    MuiAttributes?: MuiAttributes | MuiAttributesCallback[];
  }
}

/**
 * Inits the Minimal UI Attributes Library.
 */
const init = () => {
  const MuiAttributes = window.MuiAttributes;

  // Avoid initting the Attributes API more than once.
  // If the API is already initted, just init the individual Attributes and escape...
  if (MuiAttributes && !Array.isArray(MuiAttributes)) {
    initAttributes();
    return;
  }

  // Collect pre-existing callbacks
  const callbacks = Array.isArray(MuiAttributes) ? MuiAttributes : [];

  // Collect library scripts
  const scripts = [...document.querySelectorAll<HTMLScriptElement>(`script[type="module"]`)];

  // Init Attributes object
  const newMuiAttributes: MuiAttributes = {
    scripts,
    solutions: Object.fromEntries(Object.values(ATTRIBUTES).map((attribute) => [attribute, {}])) as Record<
      MuiAttributeKey,
      {
        loading?: Promise<unknown>;
        resolve?: (value: unknown) => void;
        version?: string;
        destroy?: () => boolean;
        restart?: () => Promise<unknown>;
      }
    >,
    process: new Set<MuiAttributeKey>(),

    load: initAttribute,

    push(...args) {
      for (const [key, callback] of args) {
        this.solutions[key]?.loading?.then(callback);
      }
    },

    destroy() {
      for (const solution in this.solutions) {
        this.solutions[solution as MuiAttributeKey]?.destroy?.();
      }
    },
  };

  window.MuiAttributes = newMuiAttributes;

  // Init Attributes
  initAttributes();

  // Run pre-existing callbacks
  newMuiAttributes.push(...callbacks);
};

/**
 * Inits all Attributes that are defined in the current script.
 */
const initAttributes = () => {
  const MuiAttributes = window.MuiAttributes as MuiAttributes;
  for (const script of MuiAttributes.scripts) {
    for (const attribute of Object.values(ATTRIBUTES) as MuiAttributeKey[]) {
      const isDefined = script.hasAttribute(`mui-${attribute}`);
      if (!isDefined) continue;

      initAttribute(attribute);
    }
  }
};

/**
 * Inits an individual Attribute.
 * @param attribute
 *
 * @returns A Promise that resolves once the Attribute has loaded and executed.
 */
const initAttribute = async (attribute: MuiAttributeKey) => {
  const MuiAttributes = window.MuiAttributes as MuiAttributes;
  // Ensure that the attribute is only initted once
  if (MuiAttributes.process.has(attribute)) return;

  MuiAttributes.process.add(attribute);

  // Init controls
  const controls = (MuiAttributes.solutions[attribute] ||= {});

  controls.loading = new Promise((resolve) => {
    controls.resolve = (value: unknown) => {
      resolve(value);
      delete controls.resolve;
    };
  });

  // Load Attribute package
  try {
    const { init, version } = await loadAttribute(attribute);

    // Init attribute
    const { result, destroy } = (await init()) || {};

    // Finalize controls
    controls.version = version;

    controls.destroy = () => {
      destroy?.();
      return MuiAttributes.process.delete(attribute);
    };

    controls.restart = () => {
      controls.destroy?.();
      return MuiAttributes.load(attribute);
    };

    controls.resolve?.(result);

    return result;
  } catch (err) {
    console.error(err);
  }
};

// Init
init();
