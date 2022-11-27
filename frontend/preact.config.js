
export default (config, env, helpers, options) => {
  config.resolve.modules.push(env.src)
}