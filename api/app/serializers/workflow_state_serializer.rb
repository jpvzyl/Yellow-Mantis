class WorkflowStateSerializer
  def self.render(state)
    {
      id: state.id,
      name: state.name,
      color: state.color,
      position: state.position,
      state_type: state.state_type
    }
  end
end
