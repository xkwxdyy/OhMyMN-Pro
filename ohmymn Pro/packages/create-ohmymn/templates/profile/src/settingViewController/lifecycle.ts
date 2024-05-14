import { Addon } from "~/addon"
export default {
  viewDidLoad() {
    self.tableView.allowsSelection = true
    self.view.layer.cornerRadius = 10
    self.view.layer.borderWidth = 2
  },
  //Execute when each time it is opened
  viewWillAppear() {
    self.tableView.reloadData()
    if (MN.isMacMN3) {
      self.tableView.backgroundColor = MN.currentThemeColor
      Addon.textColor =
        MN.app.currentTheme == "Gray" || MN.app.currentTheme == "Dark"
          ? UIColor.whiteColor()
          : UIColor.blackColor()
    }
    self.view.layer.borderColor = Addon.buttonColor
  }
}
