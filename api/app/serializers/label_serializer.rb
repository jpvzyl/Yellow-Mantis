class LabelSerializer
  def self.render(label)
    {
      id: label.id,
      name: label.name,
      color: label.color,
      parent_label_id: label.parent_label_id
    }
  end
end
