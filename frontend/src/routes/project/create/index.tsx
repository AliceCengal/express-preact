import { h } from "preact"
import { useEffect } from "preact/hooks"
import { createProject, ProjectCR } from "controllers/project"
import useForm from "utils/use-form"
import { useProfile } from "controllers/auth"

import style from "./style.css"

const ProjectCreate = () => {

  const { formData, update, inform } = useForm<ProjectCR>({
    owner: '',
    title: '',
    description: ''
  })

  const profile = useProfile()

  useEffect(() => {
    if (profile.data) {
      inform('owner', profile.data.user.name)
    }
  }, [profile.data])

  function handleSubmit(e: any) {
    e.preventDefault()
    createProject(formData)
      .then((res) => {
        alert(JSON.stringify(res))
      })
      .catch((err) => alert(err))
  }

  return (
    <div class="container-lg">
      <form
        class={style.form}
        onChange={update}
        onSubmit={handleSubmit}>
        <h1>Create project</h1>
        <label>Owner</label>
        <input type='text' readOnly name='owner' value={formData.owner} />
        <label>Title</label>
        <input type='text' name='title' value={formData.title} required />
        <label>Description</label>
        <textarea rows={4} name='description' value={formData.description} />
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default ProjectCreate
