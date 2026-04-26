const API_BASE = "https://sangeetsevasahara.in/api/";

const headers = {
  "Content-Type": "application/json"
};

// ---------------- GET SLOTS ----------------
export const getSlots = async () => {
  const res = await fetch(API_BASE + "get-slots.php");
  return res.json();
};

// ---------------- CHECK MOBILE ----------------
export const checkMobile = async (mobile: string) => {
  const res = await fetch(API_BASE + `check-mobile.php?mobile=${mobile}`);
  return res.json();
};

// ---------------- SEND OTP ----------------
export const insertOtp = async (data: {
  mobile: string;
}) => {
  const res = await fetch(API_BASE + "send-otp.php", {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  });
  return res.json();
};

// ---------------- VERIFY OTP ----------------
export const verifyOtp = async (data: {
  mobile: string;
  otp: string;
}) => {
  const res = await fetch(API_BASE + "verify-otp.php", {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  });
  return res.json();
};

// ---------------- GET MEMBER ----------------
export const getMemberByKKC = async (kkc_id: string) => {
  const res = await fetch(API_BASE + "get-member.php", {
    method: "POST",
    headers,
    body: JSON.stringify({ kkc_id }),
  });
  return res.json();
};

// ---------------- UPLOAD PROFILE PHOTO ----------------
export const uploadProfilePhoto = async (file: File) => {
  const formData = new FormData();
  formData.append("photo", file);

  const res = await fetch(API_BASE + "upload-profile-photo.php", {
    method: "POST",
    body: formData,
  });

  return res.json();
};

// ---------------- CREATE REGISTRATION ----------------
export const createRegistration = async (data: any) => {
  const res = await fetch(API_BASE + "register.php", {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  });
  return res.json();
};

// ---------------- ADJUST SLOT ----------------
export const adjustSlot = async (
  audition_date: string,
  time_slot: string,
  delta: number = 0
) => {
  const res = await fetch(API_BASE + "adjust-slot.php", {
    method: "POST",
    headers,
    body: JSON.stringify({ audition_date, time_slot, delta }),
  });
  return res.json();
};

// ---------------- ADMIN LOGIN ----------------
export const login = async (username: string, password: string, role: string) => {
  try {
    const res = await fetch(API_BASE + "login.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password, role }),
    });

    if (!res.ok) {
      throw new Error("Server error");
    }

    const data = await res.json();
    return data;

  } catch (error) {
    console.error("Login API error:", error);
    return {
      success: false,
      message: "Unable to login. Please try again.",
    };
  }
};




// ---------------- CREATE RAZORPAY ORDER ----------------
export const createRazorpayOrder = async (data: {
  amount: number;
  receipt: string;
}) => {
  const res = await fetch(API_BASE + "create-order.php", {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  });

  return res.json();
};

// ---------------- VERIFY RAZORPAY PAYMENT ----------------
export const verifyRazorpayPayment = async (data: {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
  registrationData: any;
}) => {
  const res = await fetch(API_BASE + "verify-payment.php", {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  });

  return res.json();
};

// ---------------- GET ALL REGISTRATIONS ----------------
export const getRegistrations = async (): Promise<RegistrationExtended[]> => {
  try {
    const res = await fetch(API_BASE + "get-registrations.php");

    const json = await res.json();

    if (json.success && Array.isArray(json.data)) {
      return json.data;
    }

    return [];
  } catch (error) {
    console.error("getRegistrations error:", error);
    return [];
  }
};

// ---------------- DELETE REGISTRATION ----------------
export const removeRegistration = async (id: string) => {
  const formData = new FormData();
  formData.append("id", id);

  const res = await fetch(API_BASE + "delete-registration.php", {
    method: "POST",
    body: formData,
  });

  const data = await res.json();

  if (!data.success) {
    throw new Error(data.message);
  }

  return data;
};

// ---------------- UPDATE REGISTRATION STATUS ----------------
export const updateRegistrationStatus = async (id: string, status: string) => {
  const res = await fetch(API_BASE + "update-registration-status.php", {
    method: "POST",
    headers,
    body: JSON.stringify({ id, status }),
  });
  return res.json();
};

export interface Registration {
  id: string;
  full_name: string;
  parent_name: string;
  date_of_birth: string;
  gender: string;
  mobile: string;
  whatsapp_number?: string;
  email: string;
  full_address: string;
  city: string;
  state: string;
  pincode: string;
  category: string;
  audition_date: string;
  is_member: boolean;
  kkc_id?: string;
  payment_amount: number;
  payment_status: string;
  payment_screenshot?: string;
  youtube_link_1?: string;
  youtube_link_2?: string;
  created_at?: string;
  is_deleted?: boolean | string;
}

export interface FieldValidation {
  min_length?: number;
  max_length?: number;
  min?: number;
  max?: number;
  pattern?: string;
  min_selected?: number;
  max_selected?: number;
  min_date?: string;
  max_date?: string;
  error_message?: string;
}

export interface FileConfig {
  accept: string;
  max_size_mb: number;
  max_duration_seconds?: number;
  preview?: boolean;
}

export interface FieldOption {
  value: string;
  label: string;
}

export interface FieldConfig {
  field_name: string;
  field_type: 'text' | 'email' | 'tel' | 'number' | 'date' | 'select' | 'radio' | 'checkbox' | 'checkbox_group' | 'textarea' | 'file' | 'url';
  label: string;
  placeholder?: string;
  required: boolean;
  validation?: FieldValidation;
  options?: FieldOption[];
  file_config?: FileConfig;
  rows?: number;
  grid_cols?: number;
  enable_otp_verification?: boolean;
  copy_from_field?: string;
  show_copy_checkbox?: boolean;
  copy_checkbox_label?: string;
}

export interface FormField {
  id: number;
  form_id: number;
  field_order: number;
  field_config: FieldConfig;
}

export interface Form {
  id: number;
  form_name: string;
  form_slug: string;
  description: string;
  is_active: boolean;
  enable_kkc_discount: boolean;
  kkc_discount_amount: number;
  base_amount: number;
  status: 'draft' | 'active' | 'inactive' | 'archived';
  start_date: string | null;
  end_date: string | null;
  created_at: string;
  fields?: FormField[];
}

export interface FormSubmission {
  id: number;
  form_id: number;
  submission_data: Record<string, any>;
  payment_status: string;
  payment_amount: number;
  payment_id?: string;
  profile_image_path?: string;
  mobile_verified: boolean;
  is_kkc_member: boolean;
  kkc_id?: string;
  submission_date: string;
}

// Form Management APIs
export const getAllForms = async (): Promise<Form[]> => {
  const res = await fetch(API_BASE + "forms/get-all-forms.php");
  return res.json();
};

export const getActiveForm = async (): Promise<Form> => {
  const res = await fetch(API_BASE + "forms/get-active-form.php");
  return res.json();
};

export const getFormById = async (id: number): Promise<Form> => {
  const res = await fetch(API_BASE + `forms/get-form.php?id=${id}`);
  return res.json();
};

export const createForm = async (data: Partial<Form>) => {
  const res = await fetch(API_BASE + "forms/create-form.php", {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  });
  return res.json();
};

export const updateForm = async (data: Partial<Form>) => {
  const res = await fetch(API_BASE + "forms/update-form.php", {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  });
  return res.json();
};

export const activateForm = async (id: number) => {
  const res = await fetch(API_BASE + "forms/activate-form.php", {
    method: "POST",
    headers,
    body: JSON.stringify({ id }),
  });
  return res.json();
};

export const deleteForm = async (id: number) => {
  const res = await fetch(API_BASE + "forms/delete-form.php", {
    method: "POST",
    headers,
    body: JSON.stringify({ id }),
  });
  return res.json();
};

// Form Fields Management APIs
export const getFormFields = async (form_id: number): Promise<FormField[]> => {
  const res = await fetch(API_BASE + `forms/get-form-fields.php?form_id=${form_id}`);
  return res.json();
};

export const addFormField = async (data: Partial<FormField>) => {
  const res = await fetch(API_BASE + "forms/add-form-field.php", {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  });
  return res.json();
};

export const updateFormField = async (data: Partial<FormField>) => {
  const res = await fetch(API_BASE + "forms/update-form-field.php", {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  });
  return res.json();
};

export const deleteFormField = async (id: number) => {
  const res = await fetch(API_BASE + "forms/delete-form-field.php", {
    method: "POST",
    headers,
    body: JSON.stringify({ id }),
  });
  return res.json();
};

export const reorderFormFields = async (form_id: number, field_orders: Array<{ field_id: number; order: number }>) => {
  const res = await fetch(API_BASE + "forms/reorder-fields.php", {
    method: "POST",
    headers,
    body: JSON.stringify({ form_id, field_orders }),
  });
  return res.json();
};

export const bulkAddFormFields = async (form_id: number, fields: Array<Partial<FormField>>) => {
  const res = await fetch(API_BASE + "forms/bulk-add-fields.php", {
    method: "POST",
    headers,
    body: JSON.stringify({ form_id, fields }),
  });
  return res.json();
};

// Form Submission APIs
export const submitForm = async (data: Partial<FormSubmission>) => {
  const res = await fetch(API_BASE + "forms/submit-form.php", {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  });
  return res.json();
};

export const getFormSubmissions = async (form_id: number): Promise<FormSubmission[]> => {
  const res = await fetch(API_BASE + `forms/get-submissions.php?form_id=${form_id}`);
  return res.json();
};

export const getFormSubmission = async (id: number): Promise<FormSubmission> => {
  const res = await fetch(API_BASE + `forms/get-submission.php?id=${id}`);
  return res.json();
};

export const updateSubmissionStatus = async (id: number, payment_status: string) => {
  const res = await fetch(API_BASE + "forms/update-submission-status.php", {
    method: "POST",
    headers,
    body: JSON.stringify({ id, payment_status }),
  });
  return res.json();
};

export const deleteSubmission = async (id: number) => {
  const res = await fetch(API_BASE + "forms/delete-submission.php", {
    method: "POST",
    headers,
    body: JSON.stringify({ id }),
  });
  return res.json();
};

// File Upload APIs
export const uploadProfileImage = async (file: File) => {
  const formData = new FormData();
  formData.append("profile_image", file);

  const res = await fetch(API_BASE + "forms/upload-profile-image.php", {
    method: "POST",
    body: formData,
  });

  return res.json();
};


export interface KKCMember {
  id: string;
  kkc_id: string;
  full_name: string;
  mobile: string;
  membership_status: string;
  join_date: string;
}

export const getAllKKCMembers = async (): Promise<KKCMember[]> => {
  const res = await fetch(API_BASE + "get-all-kkc-members.php");
  const json = await res.json();

  return Array.isArray(json.data) ? json.data : [];
};

export const addKKCMember = async (data: Partial<KKCMember>) => {
  const res = await fetch('/api/add-kkc-member.php', {
    method: 'POST',
    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (!result.success) {
    throw new Error(result.message); // 🔥 required
  }

  return result;
};

export const editKKCMember = async (data: Partial<KKCMember>) => {
  const res = await fetch(API_BASE + "edit-kkc-member.php", {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  });
  return res.json();
};

export const removeKKCMember = async (id: string) => {
  const res = await fetch(API_BASE + "remove-kkc-member.php", {
    method: "POST",
    headers,
    body: JSON.stringify({ id }),
  });
  return res.json();
};

export interface RegistrationExtended extends Registration {
  profile_image_path?: string;
  is_selected_for_audition?: boolean;
  selected_at?: string;
}


export interface GalleryItem {
  id: string;
  type: 'image' | 'video';
  file_path: string;
  tagline: string;
  description?: string;
  display_order: number;
  is_active: boolean;
  created_at: string;
}

export const getAllGalleryItems = async (): Promise<GalleryItem[]> => {
  const res = await fetch(API_BASE + "get-all-items.php");
  return res.json();
};

export const addGalleryItem = async (data: FormData) => {
  const res = await fetch(API_BASE + "add-item.php", {
    method: "POST",
    body: data
  });

  return res.json();
};

export const removeGalleryItem = async (id: string) => {
  const res = await fetch(API_BASE + "remove-item.php", {
    method: "POST",
    headers,
    body: JSON.stringify({ id }),
  });
  return res.json();
};

export const updateGalleryItemOrder = async (items: Array<{ id: string; display_order: number }>) => {
  const res = await fetch(API_BASE + "update-order.php", {
    method: "POST",
    headers,
    body: JSON.stringify({ items }),
  });
  return res.json();
};

export interface JudgeSession {
  id: string;
  judge_name: string;
  username: string;
}

export interface JudgeCandidate {
  id: string;
  full_name: string;
  mobile: string;
  email: string;
  category: string;
  audition_date: string;
  profile_image_path?: string;
  city?: string;
  state?: string;
}

export interface JudgeScore {
  id: string;
  candidate_id: string;
  judge_id: string;
  candidate_name: string;
  candidate_mobile: string;
  candidate_email: string;
  candidate_category: string;
  candidate_profile_image?: string;
  vocal_quality: number;
  stage_presence: number;
  song_choice: number;
  overall_impact: number;
  total_score: number;
  is_locked: boolean;
  scored_at: string;
}

export const loginJudge = async (username: string, password: string) => {
  const res = await fetch(API_BASE + "judge/login.php", {
    method: "POST",
    headers,
    body: JSON.stringify({ username, password }),
  });
  return res.json();
};

export const searchCandidates = async (query: string, judge_id: string) => {   
  const res = await fetch(API_BASE + `judge/search-candidates.php?query=${encodeURIComponent(query)}&judge_id=${judge_id}`);
  return res.json();
};

export const submitJudgeScore = async (data: {
  candidate_id: string;
  judge_id: string;
  vocal_quality: number;
  stage_presence: number;
  song_choice: number;
  overall_impact: number;
}) => {
  const res = await fetch(API_BASE + "judge/submit-score.php", {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  });
  return res.json();
};

export const updateJudgeScore = async (data: {
  score_id: string;
  judge_id: string;
  vocal_quality: number;
  stage_presence: number;
  song_choice: number;
  overall_impact: number;
}) => {
  const res = await fetch(API_BASE + "judge/update-score.php", {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  });
  return res.json();
};

export const getJudgeScores = async (judge_id: string): Promise<JudgeScore[]> => {
  const res = await fetch(API_BASE + `judge/get-scores.php?judge_id=${judge_id}`);
  return res.json();
};
