export type ProfileActionState = {
  error?: string
  success?: string
  slug?: string
}

export type ProfileAction = (
  state: ProfileActionState,
  formData: FormData,
) => Promise<ProfileActionState>

export type ProfileFormValues = {
  displayName: string
  title: string
  bio: string
  email: string
  phone: string
  whatsapp: string
  website: string
  instagram: string
  facebook: string
  tiktok: string
}
