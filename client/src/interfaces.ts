interface Job {
  job_title: string
  company: string
  location: string
  duration: string
  responsibilities?: string[]
}

interface Education {
  degree: string
  institution: string
  year: number | string
}

export interface Resume {
  name: string
  contact: {
    location: string
    phone: string
    email: string
    linkedin: string
  }
  summary: string
  experience: Job[]
  education: Education[]
  awards: string[]
  skills: { [category: string]: string[] }
}
