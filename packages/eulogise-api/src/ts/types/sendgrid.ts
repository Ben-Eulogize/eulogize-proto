export namespace Sendgrid {
  export namespace Template {
    export namespace Account {
      export interface SignUp {
        customerName: string
        deceasedName: string
        magicInviteLink: string
      }
      export namespace Invite {
        export interface Visitor {
          inviteeName: string
          deceasedName: string
          customerEmailAddress: string
          magicInviteLink: string
        }
        export interface Contributor {
          inviteeName: string
          greeting: string
          image: string
          content: string
          magicInviteLink: string
        }
        export interface ClientCustomerContributor {
          inviteeName: string
          clientUser: string
          clientBrand: string
          clientEmail: string
          deceasedName: string
          magicInviteLink: string
        }
        export interface Customer {
          inviteeName: string
          magicInviteLink: string
        }
        export interface Client {
          clientUser: string
          clientBrand: string
          magicInviteLink: string
        }
      }
      export namespace Password {
        export interface Reset {
          customerName: string
          email: string
          magicPasswordResetLink: string
        }
      }
    }
    export namespace Resource {
      export namespace Booklet {
        export interface Print {
          quantity: number
          deliveryAddress: string
          attentionTo: string
          paperQuality: string
          pdfUrl: string
        }
        export interface Generated {
          fullName: string
          customerName: string
          deceasedName: string
          magicInviteLink: string
          clientLogoUrl?: string
          clientEmailAssetUrl?: string
          arrangerName?: string
        }
      }
      export namespace Slideshow {
        export interface Generated {
          fullName: string
          customerName: string
          deceasedName: string
          magicInviteLink: string
        }
      }
      export namespace SidedCard {
        export interface Print {
          quantity: number
          deliveryAddress: string
          attentionTo: string
          paperQuality: string
          pdfUrl: string
        }
        export interface Generated {
          fullName: string
          deceasedName: string
          magicInviteLink: string
        }
      }
      export namespace Bookmark {
        export interface Print {
          quantity: number
          deliveryAddress: string
          attentionTo: string
          paperQuality: string
          pdfUrl: string
        }
        export interface Generated {
          fullName: string
          deceasedName: string
          magicInviteLink: string
        }
      }
      export namespace ThankyouCard {
        export interface Print {
          quantity: number
          deliveryAddress: string
          attentionTo: string
          paperQuality: string
          pdfUrl: string
        }
        export interface Generated {
          fullName: string
          deceasedName: string
          magicInviteLink: string
        }
      }
    }
  }
}
